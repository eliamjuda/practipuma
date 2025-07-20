// hooks/useSimulacro.ts
import { useState, useCallback } from 'react';
import { ExamQuestion, ExamArea } from '@/types/exam';

interface SimulacroQuestion {
  position: number;
  question: {
    question_id: number;
    subject: string;
    subtopic: string;
    statement: string;
    explanation: string;
    type: string;
  };
  answers: Array<{
    option_id: number;
    content: string;
    is_correct: boolean;
    type: string;
  }>;
}

interface SimulacroResponse {
  simulacro: {
    area: string;
    total_questions: number;
    questions: SimulacroQuestion[];
  };
  distribution: {
    expected: Record<string, number>;
    obtained: Record<string, number>;
  };
  metadata: {
    generated_at: string;
    area: string;
    total_questions: number;
  };
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface UseSimulacroReturn {
  questions: ExamQuestion[];
  loadingState: LoadingState;
  error: string | null;
  distribution: SimulacroResponse['distribution'] | null;
  metadata: SimulacroResponse['metadata'] | null;
  loadSimulacro: (area: ExamArea) => Promise<void>;
  retry: () => void;
}

export const useSimulacro = (): UseSimulacroReturn => {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [distribution, setDistribution] = useState<SimulacroResponse['distribution'] | null>(null);
  const [metadata, setMetadata] = useState<SimulacroResponse['metadata'] | null>(null);
  const [lastArea, setLastArea] = useState<ExamArea | null>(null);

  const loadSimulacro = useCallback(async (area: ExamArea) => {
    setLoadingState('loading');
    setError(null);
    setLastArea(area);
    
    try {
      // URL de tu edge function - ajustar según tu configuración
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/getSimulacro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          // Si tienes autenticación de usuario, usar:
          // 'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          area: `area${area}`
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }

      const data: SimulacroResponse = await response.json();
      
      // Validar que la respuesta tenga el formato esperado
      if (!data.simulacro || !data.simulacro.questions || !Array.isArray(data.simulacro.questions)) {
        throw new Error('Formato de respuesta inválido');
      }

      // Transformar datos de la API al formato del componente
      const transformedQuestions: ExamQuestion[] = data.simulacro.questions.map((q,) => ({
        question_id: q.question.question_id,
        subject: q.question.subject,
        area: area,
        statement: q.question.statement,
        explanation: q.question.explanation,
        type: (q.question.type as "text" | "image") || "text",
        answers: q.answers.map((answer, answerIndex) => ({
          option_id: answer.option_id || answerIndex + 1,
          content: answer.content,
          is_correct: answer.is_correct,
          type: (answer.type as "text" | "image") || "text"
        }))
      }));

      // Validar que tengamos 120 preguntas
      if (transformedQuestions.length !== 120) {
        console.warn(`⚠️ Se esperaban 120 preguntas, se recibieron ${transformedQuestions.length}`);
      }

      setQuestions(transformedQuestions);
      setDistribution(data.distribution);
      setMetadata(data.metadata);
      setLoadingState('success');
      
      console.log('✅ Simulacro cargado exitosamente:', {
        area: data.simulacro.area,
        totalQuestions: data.simulacro.total_questions,
        distribution: data.distribution,
        metadata: data.metadata
      });
      
    } catch (err) {
      console.error('❌ Error cargando simulacro:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar el simulacro';
      setError(errorMessage);
      setLoadingState('error');
      
      // Limpiar datos en caso de error
      setQuestions([]);
      setDistribution(null);
      setMetadata(null);
    }
  }, []);

  // Función para reintentar con la última área
  const retry = useCallback(() => {
    if (lastArea) {
      loadSimulacro(lastArea);
    }
  }, [lastArea, loadSimulacro]);

  return {
    questions,
    loadingState,
    error,
    distribution,
    metadata,
    loadSimulacro,
    retry
  };
};