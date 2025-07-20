"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import ExamHeader from "./components/ExamHeader";
import ExamNavigation from "./components/ExamNavigation";
import ExamQuestionCard from "./components/ExamQuestionCard";
import ExamSummary from "./components/ExamSummary";
import Button from "@/components/ui/buttonPP";
import { useExamParams } from "@/hooks/useExamParams";
import { useSimulacro } from "@/hooks/useSimulacro";
import SkeletonLoader from "./components/SkeletonLoader";

export default function PracticarExamenSimulacro() {
  const examConfig = useExamParams();
  const { 
    questions, 
    loadingState, 
    error, 
    // distribution, 
    // metadata, 
    loadSimulacro, 
    retry 
  } = useSimulacro();
  
  // Estados del examen
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map());
  const [examComplete, setExamComplete] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [examStartTime, setExamStartTime] = useState<number | null>(null);
  const [finalTime, setFinalTime] = useState<string | null>(null);

  // Cargar simulacro al montar el componente
  useEffect(() => {
    loadSimulacro(examConfig.area);
  }, [examConfig.area, loadSimulacro]);

  // Iniciar cronómetro cuando las preguntas se cargan exitosamente
  useEffect(() => {
    if (loadingState === 'success' && questions.length > 0 && !examStartTime) {
      setExamStartTime(Date.now());
    }
  }, [loadingState, questions.length, examStartTime]);

  // Valores calculados
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const selectedAnswer = useMemo(() => 
    currentQuestion ? userAnswers.get(currentQuestion.question_id) ?? null : null, 
    [userAnswers, currentQuestion]
  );
  const answeredCount = userAnswers.size;
  const canFinishExam = answeredCount === 120 && questions.length === 120;

  // Calcular tiempo transcurrido
  const calculateElapsedTime = useCallback(() => {
    if (!examStartTime) return "0h 0m 0s";
    
    const elapsed = Math.floor((Date.now() - examStartTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const mins = Math.floor((elapsed % 3600) / 60);
    const secs = elapsed % 60;
    return `${hours}h ${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  }, [examStartTime]);

  // Event handlers
  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (!currentQuestion) return;
    
    setUserAnswers(prev => {
      const newAnswers = new Map(prev);
      newAnswers.set(currentQuestion.question_id, answerIndex);
      return newAnswers;
    });
  }, [currentQuestion]);

  const goToQuestion = useCallback((questionIndex: number) => {
    if (questionIndex >= 0 && questionIndex < questions.length) {
      setCurrentQuestionIndex(questionIndex);
      setShowNavigation(false);
    }
  }, [questions.length]);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const goToPrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const finishExam = useCallback(() => {
    if (canFinishExam) {
      const time = calculateElapsedTime();
      setFinalTime(time);
      setExamComplete(true);
    }
  }, [canFinishExam, calculateElapsedTime]);

  const toggleNavigation = useCallback(() => {
    setShowNavigation(prev => !prev);
  }, []);

  // Pantalla de carga
  if (loadingState === 'loading') {
    return (
      // <div className="h-screen w-screen flex items-center justify-center bg-(--principal-main-color)">
      //   <div className="text-center">
      //     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--principal-accent-color) mx-auto mb-4"></div>
      //     <h2 className="text-xl font-bold text-(--principal-text-color) mb-2">
      //       Generando tu examen simulacro
      //     </h2>
      //     <p className="text-(--principal-text-secondary) mb-2">
      //       Área {examConfig.area}
      //     </p>
      //     <p className="text-sm text-(--principal-text-secondary)">
      //       Esto puede tomar unos segundos...
      //     </p>
      //   </div>
      // </div>
      <SkeletonLoader/>
    );
  }

  // Pantalla de error
  if (loadingState === 'error') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-(--principal-main-color)">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-(--principal-text-color) mb-2">
            Error al cargar el examen
          </h2>
          <p className="text-(--principal-text-secondary) mb-4">
            {error || 'Ha ocurrido un error inesperado'}
          </p>
          <div className="space-y-2">
            <Button 
              onClick={retry}
              variant="normal"
              className="w-full"
            >
              Reintentar
            </Button>
            {/* Información de debug en desarrollo */}
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left text-sm">
                <summary className="cursor-pointer text-(--principal-text-secondary)">
                  Información técnica
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify({ error, examConfig }, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de resumen (examen completado)
  if (examComplete) {
    return (
      <ExamSummary
        questions={questions}
        userAnswers={userAnswers}
        totalTime={finalTime}
        area={examConfig.area}
        // distribution={distribution}
        // metadata={metadata}
      />
    );
  }

  // Verificar que hay preguntas cargadas
  if (questions.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-(--principal-main-color)">
        <div className="text-center">
          <p className="text-(--principal-text-secondary)">
            No se encontraron preguntas para este simulacro
          </p>
          <Button 
            onClick={retry}
            variant="normal"
            className="mt-4"
          >
            Cargar nuevamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-(--principal-main-color)">
      {/* Header */}
      <ExamHeader 
        area={examConfig.area}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        onToggleNavigation={toggleNavigation}
        showNavigation={showNavigation}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Navegación lateral */}
        <ExamNavigation
          questions={questions}
          userAnswers={userAnswers}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionSelect={goToQuestion}
          isVisible={showNavigation}
          onClose={() => setShowNavigation(false)}
        />

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col">
          {/* Pregunta */}
          <div className="flex-1 overflow-y-auto ">
            <div className="min-h-full flex items-center justify-center p-4 md:p-8">
              <div className="max-w-full lg:w-[40%] w-full md:w-[60%]">
                {currentQuestion && (
                  <ExamQuestionCard
                    question={currentQuestion}
                    currentQuestionIndex={currentQuestionIndex + 1}
                    selectedAnswer={selectedAnswer}
                    onAnswerSelect={handleAnswerSelect}
                  />
                )}
              </div>
            </div>
            <div className="h-32 md:h-0"></div>
          </div>

          {/* Controles de navegación */}
          <div className="bg-(--principal-secondary-color) border-t border-(--shadow) 
                        sticky bottom-0 z-10 p-4 md:bottom-auto">
            <div className="flex md:flex-row flex-col w-full justify-center items-center md:gap-50">
              {/* Botón finalizar */}
              <div className="md:block order-1 mt-4 md:mt-0">
                <Button
                  onClick={finishExam}
                  disabled={!canFinishExam}
                  variant={canFinishExam ? "correct" : "normal"}
                  className={`md:block md:mb-0 ${!canFinishExam ? 'opacity-50 cursor-not-allowed hidden' : 'block mb-15'}`}
                >
                  {canFinishExam ? 'Finalizar' : `Faltan ${questions.length - answeredCount}`}
                </Button>
              </div>
              
              {/* Navegación */}
              <div className="flex justify-center gap-3">
                <Button
                  onClick={goToPrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="normal"
                  className={`flex-1 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Anterior
                </Button>
                <Button
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  variant="normal"
                  className={`flex-1 ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}