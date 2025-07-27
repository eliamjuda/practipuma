"use client";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import OptionCard from "./components/OptionCard";
import ReactKatex from "@pkasila/react-katex";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import Button from "@/components/ui/buttonPP";
import { GameModes, PracticeQuestion } from "@/types/practice";
import { usePracticeParams } from "@/hooks/usePracticeParams";
import PracticeSummary from "./components/PracticeSummary";
import { GetQuestionsParams, useQuestions } from "@/hooks/useQuestions";
import SkeletonLoader from "./components/SkeletonLoader";

const LETTERS = ["A", "B", "C", "D"];

export default function Practicar() {
  const config = usePracticeParams();
  const { getQuestions, loading, error } = useQuestions();

  // Estados principales
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<
    { questionId: number; selectedAnswer: number; isCorrect: boolean }[]
  >([]);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [tiempoFinal, setTiempoFinal] = useState<string | null>(null);
  const [timeExpired, setTimeExpired] = useState(false);
  const [lives, setLives] = useState(3);
  
  // Estados para preguntas - consolidados
  const [questionsState, setQuestionsState] = useState<{
    data: PracticeQuestion[];
    loaded: boolean;
    configHash: string;
  }>({
    data: [],
    loaded: false,
    configHash: ''
  });
  
  // Refs
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(Date.now());
  const loadingPromiseRef = useRef<Promise<void> | null>(null);

  // Hash estable de la configuración para evitar re-renders innecesarios
  const configHash = useMemo(() => {
    const configObj = {
      questions: config.questions,
      mode: config.mode,
      subjectId: config.subjectId,
      subtopicId: config.subtopicId,
      // Convertir arrays a strings ordenados para consistencia
      subjects: config.subjects ? [...config.subjects].sort().join(',') : null
    };
    return JSON.stringify(configObj);
  }, [config.questions, config.mode, config.subjectId, config.subtopicId, config.subjects]);

  // Cargar preguntas - SOLO cuando cambia el hash de configuración
  useEffect(() => {
    // Si ya tenemos las preguntas para esta configuración, no hacer nada
    if (questionsState.loaded && questionsState.configHash === configHash) {
      return;
    }

    // Si ya hay una carga en progreso, cancelarla
    if (loadingPromiseRef.current) {
      return; // No iniciar otra carga
    }

    const loadQuestions = async (): Promise<void> => {
      try {
        // Construir parámetros según el modo
        const params: GetQuestionsParams = {
          question_count: config.questions,
          mode: config.mode,
        };

        // Agregar parámetros específicos según el modo
        switch (config.mode) {
          case GameModes.HARDCORE:
            // Solo necesita subjects
            params.subjects = config.subjects;
            break;
            
          case GameModes.RANDOM:
            // Necesita subjects y question_count
            params.subjects = config.subjects;
            break;
            
          case GameModes.SUBTOPIC:
            // Necesita subject_id y subtopic_id
            params.subject_id = config.subjectId;
            params.subtopic_id = config.subtopicId;
            break;
            
          case GameModes.SUBJECT:
          default:
            // Modo por defecto - solo subjects
            params.subjects = config.subjects;
            break;
        }

        const result = await getQuestions(params);
        
        if (result && result.questions) {
          setQuestionsState({
            data: result.questions,
            loaded: true,
            configHash
          });
        } else {
          setQuestionsState(prev => ({
            ...prev,
            loaded: true,
            configHash
          }));
        }
      } catch (err) {
        console.error('Error cargando preguntas:', err);
        setQuestionsState(prev => ({
          ...prev,
          loaded: true,
          configHash
        }));
      } finally {
        loadingPromiseRef.current = null;
      }
    };

    // Resetear estado si cambia la configuración
    if (questionsState.configHash !== configHash) {
      setQuestionsState(prev => ({
        ...prev,
        data: [],
        loaded: false,
        configHash
      }));
      
      // Resetear otros estados relacionados
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setConfirmed(false);
      setPracticeComplete(false);
      setUserAnswers([]);
      setTimeExpired(false);
      setLives(3);
      startTimeRef.current = Date.now();
    }

    loadingPromiseRef.current = loadQuestions();
    
    return () => {
      // Cleanup si el componente se desmonta
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [configHash, config.questions, config.mode, config.subjectId, config.subtopicId, config.subjects, getQuestions, questionsState.loaded, questionsState.configHash]); // SOLO dependemos del hash

  // Valores memoizados
  const totalQuestions = useMemo(() => 
    questionsState.loaded ? Math.min(config.questions, questionsState.data.length) : config.questions,
    [config.questions, questionsState.data.length, questionsState.loaded]
  );

  const currentQuestion = useMemo(() => 
    questionsState.loaded && questionsState.data.length > 0 ? questionsState.data[currentQuestionIndex] : null,
    [currentQuestionIndex, questionsState.data, questionsState.loaded]
  );

  const progress = useMemo(() => 
    ((currentQuestionIndex + 1) / totalQuestions) * 100,
    [currentQuestionIndex, totalQuestions]
  );
  
  const isSelectedCorrect = useMemo(() => 
    selectedOption !== null && currentQuestion 
      ? currentQuestion.answers[selectedOption].is_correct 
      : false,
    [selectedOption, currentQuestion]
  );

  // Funciones de utilidad - memoizadas para evitar re-renders
  const getFormattedElapsedTime = useCallback((startTime: number) => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  }, []);

  const calculateFinalTime = useCallback(() => {
    return getFormattedElapsedTime(startTimeRef.current);
  }, [getFormattedElapsedTime]);

  // Manejadores de eventos
  const handleSelect = useCallback((index: number) => {
    if (!confirmed) setSelectedOption(index);
  }, [confirmed]);

  const handleConfirm = useCallback(() => {
    if (selectedOption === null || !currentQuestion) return;
    
    const isCorrect = currentQuestion.answers[selectedOption].is_correct;
    
    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.question.question_id,
        selectedAnswer: selectedOption,
        isCorrect,
      },
    ]);
    setConfirmed(true);

    if (config.mode === GameModes.HARDCORE && !isCorrect) {
      setLives((prev) => {
        if (prev <= 1) {
          setPracticeComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }
  }, [selectedOption, currentQuestion, config.mode]);

  const handleContinue = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedOption(null);
      setConfirmed(false);
    } else {
      const finalTime = calculateFinalTime();
      setTiempoFinal(finalTime);
      setPracticeComplete(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [currentQuestionIndex, totalQuestions, calculateFinalTime]);

  const handleReport = useCallback(() => {
    if (!currentQuestion) return;
    console.log(`Reportando pregunta ${currentQuestion.question.question_id}`);
    alert("Pregunta reportada. Gracias por tu feedback.");
  }, [currentQuestion]);

  const handleTimerExpire = useCallback(() => {
    if (!practiceComplete) {
      const final = getFormattedElapsedTime(
        Date.now() - config.selectedTime * 60000
      );
      setTiempoFinal(final);
      setPracticeComplete(true);
      setTimeExpired(true);
    }
  }, [practiceComplete, config.selectedTime, getFormattedElapsedTime]);

  const toggleExplanationModal = useCallback(() => {
    setShowExplanationModal(prev => !prev);
  }, []);

  // Timer effect - mejorado para evitar memory leaks
  useEffect(() => {
    if (!config.timerEnabled || !questionsState.loaded || practiceComplete) return;

    const totalTimeSec = config.selectedTime * 60;
    const timeoutId = setTimeout(() => {
      handleTimerExpire();
    }, totalTimeSec * 1000);

    timeoutRef.current = timeoutId;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [config.timerEnabled, config.selectedTime, handleTimerExpire, practiceComplete, questionsState.loaded]);

  // Memoizar textos del botón
  const buttonText = useMemo(() => {
    if (!confirmed) return "Confirmar";
    return currentQuestionIndex < totalQuestions - 1 ? "Continuar" : "Finalizar";
  }, [confirmed, currentQuestionIndex, totalQuestions]);

  const buttonVariant = useMemo(() => 
    confirmed ? (isSelectedCorrect ? "correct" : "incorrect") : "normal",
    [confirmed, isSelectedCorrect]
  );

  // Función para reintentar carga
  const handleRetry = useCallback(() => {
    setQuestionsState({
      data: [],
      loaded: false,
      configHash: ''
    });
    loadingPromiseRef.current = null;
  }, []);

  // Renderizado condicional
  if (loading || !questionsState.loaded ) {
    return (
      <SkeletonLoader/>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg mb-4">Error al cargar preguntas:</p>
          <p className="mb-4">{error}</p>
          <button 
            onClick={handleRetry}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (questionsState.data.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">No se encontraron preguntas para esta configuración</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p>Cargando pregunta...</p>
      </div>
    );
  }

  if (practiceComplete) {
    return (
      <PracticeSummary
        userAnswers={userAnswers}
        totalQuestions={totalQuestions}
        totalTime={tiempoFinal}
        timeExpired={timeExpired}
        questions={questionsState.data.slice(0, totalQuestions)}
      />
    );
  }

  // Renderizado principal
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header
        subject={currentQuestion.question.subject}
        subtopic={currentQuestion.question.subtopic}
        showTimer={config.timerEnabled}
        totalTime={config.selectedTime * 60}
        onTimerExpire={handleTimerExpire}
      />
      
      <div className="flex-1 overflow-y-auto flex justify-center">
        <div className="w-full md:w-[30%] p-2 md:p-8">
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={totalQuestions}
            progress={progress}
            lives={config.mode === GameModes.HARDCORE ? lives : undefined}
          />

          <div className="min-h-[40%] flex items-center justify-center text-center text-1xl md:text-xl font-medium mb-6">
            <ReactKatex>{currentQuestion.question.statement}</ReactKatex>
          </div>

          <div className="space-y-2">
            {currentQuestion.answers.map((answer, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = confirmed ? answer.is_correct : null;

              return (
                <OptionCard
                  key={answer.option_id}
                  letter={LETTERS[index]}
                  content={answer.content}
                  selected={isSelected}
                  isCorrect={isSelected ? isCorrect : null}
                  showCorrect={confirmed && answer.is_correct}
                  onClick={() => handleSelect(index)}
                />
              );
            })}
          </div>

          <div className="md:h-10 h-5"></div>
        </div>
      </div>

      {/* Modal de explicación */}
      {showExplanationModal && (
        <div className="fixed inset-0 bg-(--principal-main-color)/70 flex items-center justify-center z-50">
          <div className="bg-(--principal-secondary-color) md:border-2 md:border-(--shadow) rounded-lg md:max-w-lg md:w-full md:mx-4 md:mb-32 w-full h-full md:h-auto md:max-h-[70vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex py-6 justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Justificación</h3>
                <button
                  onClick={toggleExplanationModal}
                  className="cursor-pointer text-gray-500 hover:text-gray-700 text-4xl"
                >
                  ×
                </button>
              </div>
              <div className="text-(--text) leading-relaxed md:pb-4">
                <ReactKatex>{currentQuestion.question.explanation}</ReactKatex>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-(--principal-secondary-color) sticky bottom-0 w-full border-t border-(--shadow) min-h-[100px] py-6 flex flex-col justify-center items-center">
        {/* Iconos de acción */}
        {confirmed && (
          <div className="flex gap-6 mb-4">
            <button
              onClick={toggleExplanationModal}
              className={`${
                config.showJustifications ? "visible" : "invisible"
              } text-gray-600 hover:text-blue-500`}
            >
              <svg
                className="cursor-pointer w-5 h-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs">Justificación</span>
            </button>
            <button
              onClick={handleReport}
              className="flex flex-col items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <svg
                className="cursor-pointer w-5 h-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
              <span className="text-xs">Reportar</span>
            </button>
          </div>
        )}

        <Button
          onClick={confirmed ? handleContinue : handleConfirm}
          disabled={selectedOption === null}
          variant={buttonVariant}
          className={`${
            selectedOption === null ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}