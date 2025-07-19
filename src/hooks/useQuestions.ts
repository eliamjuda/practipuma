import { GameModes, PracticeQuestion } from "@/types/practice";
import { useState, useCallback, useRef, useMemo } from "react";
import { createClient } from '@supabase/supabase-js'
import { getSubjectsIdsByName } from "@/lib/utils";

interface GetQuestionsResponse {
  questions: PracticeQuestion[];
  total: number;
  mode: string;
}

export interface GetQuestionsParams {
  subjects?: string[];      // Array de nombres de materias para RANDOM, HARDCORE, SUBJECT
  subject_id?: number;      // ID numérico para SUBTOPIC
  subtopic_id?: number | null;     // ID numérico del subtema para SUBTOPIC
  question_count: number;
  mode: GameModes;
}

interface EdgeFunctionPayload {
  question_count: number;
  mode: GameModes;
  subjects?: number[];      // Array de IDs numéricos
  subject_id?: number;      // ID numérico para SUBTOPIC
  subtopic_id?: number | null;     // ID numérico del subtema para SUBTOPIC
}

// Singleton para cliente de Supabase - FUERA del hook para evitar recreación
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Cache simple para evitar requests duplicados
const requestCache = new Map<string, Promise<GetQuestionsResponse | null>>();

export const useQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // AbortController para cancelar requests
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentRequestRef = useRef<string | null>(null);

  // Validaciones memoizadas
  const validateParams = useMemo(() => {
    return (params: GetQuestionsParams): void => {
      if (params.question_count <= 0 || params.question_count > 50) {
        throw new Error('La cantidad de preguntas debe estar entre 1 y 50');
      }

      // Validaciones específicas por modo
      switch (params.mode) {
        case GameModes.SUBJECT:
        case GameModes.RECENT:
        case GameModes.HARDCORE:
          if (!params.subjects || params.subjects.length === 0) {
            throw new Error(`El modo ${params.mode} requiere seleccionar al menos una materia`);
          }
          break;
          
        case GameModes.RANDOM:
          if (!params.subjects || params.subjects.length === 0) {
            throw new Error('El modo aleatorio requiere seleccionar al menos una materia');
          }
          break;
          
        case GameModes.SUBTOPIC:
          if (!params.subject_id) {
            throw new Error('El modo subtema requiere un ID de materia válido');
          }
          if (!params.subtopic_id) {
            throw new Error('El modo subtema requiere un ID de subtema válido');
          }
          break;
      }
    };
  }, []);

  // Función para generar cache key
  const getCacheKey = useCallback((params: GetQuestionsParams): string => {
    const key = {
      subjects: params.subjects ? [...params.subjects].sort() : null,
      subject_id: params.subject_id || null,
      subtopic_id: params.subtopic_id || null,
      question_count: params.question_count,
      mode: params.mode,
    };
    return JSON.stringify(key);
  }, []);

  // Función principal optimizada con cache y deduplicación
  const getQuestions = useCallback(async (
    params: GetQuestionsParams
  ): Promise<GetQuestionsResponse | null> => {
    
    const cacheKey = getCacheKey(params);
    
    // Si ya hay un request idéntico en curso, devolverlo
    if (requestCache.has(cacheKey)) {
      return requestCache.get(cacheKey)!;
    }

    // Si hay un request diferente en curso, cancelarlo
    if (abortControllerRef.current && currentRequestRef.current !== cacheKey) {
      abortControllerRef.current.abort();
    }

    const requestPromise = (async (): Promise<GetQuestionsResponse | null> => {
      // Crear nuevo AbortController
      abortControllerRef.current = new AbortController();
      currentRequestRef.current = cacheKey;
      
      setLoading(true);
      setError(null);

      try {
        // Validar parámetros
        validateParams(params);

        // Preparar payload según el modo
        const payload: EdgeFunctionPayload = {
          question_count: params.question_count,
          mode: params.mode,
        };

        // Agregar parámetros específicos según el modo
        switch (params.mode) {
          case GameModes.SUBJECT:
          case GameModes.HARDCORE:
          case GameModes.RANDOM:
          case GameModes.RECENT:
            payload.subjects = getSubjectsIdsByName(params.subjects!) as typeof payload.subjects;
            break;
            
          case GameModes.SUBTOPIC:
            payload.subject_id = params.subject_id;
            payload.subtopic_id = params.subtopic_id;
            break;
            
        }

        console.log('📤 Payload enviado a Edge Function:', JSON.stringify(payload, null, 2));

        // Llamar a Edge Function con timeout
        const { data, error: supabaseError } = await Promise.race([
          supabaseClient.functions.invoke('getQuestions', {
            body: payload
          }),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout: La solicitud tardó demasiado')), 15000)
          )
        ]);

        // Verificar si fue cancelado
        if (abortControllerRef.current?.signal.aborted) {
          return null;
        }

        if (supabaseError) {
          throw new Error(supabaseError.message || 'Error al obtener preguntas');
        }

        if (!data || !data.questions || !Array.isArray(data.questions)) {
          throw new Error('Respuesta inválida del servidor');
        }

        if (data.questions.length === 0) {
          throw new Error('No se encontraron preguntas para los criterios seleccionados');
        }

        const result = data as GetQuestionsResponse;
        console.log('📥 Respuesta recibida:', { 
          questionCount: result.questions.length, 
          mode: result.mode,
          total: result.total,
          respuesta: data
        });
        
        // Limpiar cache después de un tiempo para evitar memoria excesiva
        setTimeout(() => {
          requestCache.delete(cacheKey);
        }, 5 * 60 * 1000); // 5 minutos
        
        return result;

      } catch (err) {
        // Ignorar errores de cancelación
        if (err instanceof Error && err.name === 'AbortError') {
          return null;
        }

        const errorMessage = err instanceof Error ? err.message : 'Error desconocido al obtener preguntas';
        setError(errorMessage);
        console.error('❌ Error en getQuestions:', err);
        return null;
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
        currentRequestRef.current = null;
        // Limpiar del cache en caso de error
        requestCache.delete(cacheKey);
      }
    })();

    // Guardar en cache
    requestCache.set(cacheKey, requestPromise);
    
    return requestPromise;
  }, [getCacheKey, validateParams]);

  // Funciones específicas optimizadas - con nuevas firmas
  const getSubjectQuestions = (
    subjects: string[], 
    question_count: number
  ) => getQuestions({
    subjects,
    question_count,
    mode: GameModes.SUBJECT
  });

  const getSubtopicQuestions = (
    subject_id: number, 
    subtopic_id: number, 
    question_count: number
  ) => getQuestions({
    subject_id,
    subtopic_id,
    question_count,
    mode: GameModes.SUBTOPIC
  });

  const getRandomQuestions = (
    subjects: string[], 
    question_count: number
  ) => getQuestions({
    subjects,
    question_count,
    mode: GameModes.RANDOM
  });

  const getHardcoreQuestions = (subjects: string[]) => getQuestions({
    subjects,
    question_count: 40, // Cantidad fija para hardcore
    mode: GameModes.HARDCORE
  });

  const getExamQuestions = (
    areas: number[], 
    question_count: number
  ) => getQuestions({
    question_count,
    mode: GameModes.EXAM
  });

  // Función para cancelar request actual
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // Limpiar cache de requests pendientes
    requestCache.clear();
  }, []);

  // Limpiar al desmontar
  const cleanup = useCallback(() => {
    cancelRequest();
    setError(null);
  }, [cancelRequest]);

  return {
    // Función general - ESTABLE, no cambia entre renders
    getQuestions,
    
    // Funciones específicas - ESTABLES
    getSubjectQuestions,
    getSubtopicQuestions,
    getRandomQuestions,
    getHardcoreQuestions,
    getExamQuestions,
    
    // Utilidades
    cancelRequest,
    cleanup,
    
    // Estados
    loading,
    error
  };
};