"use client";
import { useState, useCallback, useMemo } from "react";
import ExamHeader from "./components/ExamHeader";
import ExamNavigation from "./components/ExamNavigation";
import ExamQuestionCard from "./components/ExamQuestionCard";
import ExamSummary from "./components/ExamSummary";
import Button from "@/components/ui/buttonPP";
import { ExamQuestion, ExamArea } from "@/types/exam";
import { useExamParams } from "@/hooks/useExamParams";

// Mock data para 120 preguntas del examen
const generateMockExam = (area: ExamArea): ExamQuestion[] => {
  const subjects = {
    1: ["Matemáticas", "Física", "Química", "Biología"],
    2: ["Historia", "Geografía", "Literatura", "Filosofía"], 
    3: ["Matemáticas", "Historia", "Geografía", "Biología"],
    4: ["Administración", "Economía", "Contabilidad", "Derecho"]
  };

  const mockQuestions: ExamQuestion[] = [];
  
  for (let i = 1; i <= 120; i++) {
    const subjectList = subjects[area] || subjects[1];
    const subject = subjectList[(i - 1) % subjectList.length];
    
    mockQuestions.push({
      question_id: i,
      subject,
      area,
      statement: `Pregunta ${i}: ¿Cuál de las siguientes opciones es correcta para el tema de ${subject}?`,
      explanation: `Explicación detallada para la pregunta ${i} del área ${area}.`,
      type: "text",
      answers: [
        {
          option_id: 1,
          content: `Opción A para pregunta ${i}`,
          is_correct: i % 4 === 1,
          type: "text"
        },
        {
          option_id: 2, 
          content: `Opción B para pregunta ${i}`,
          is_correct: i % 4 === 2,
          type: "text"
        },
        {
          option_id: 3,
          content: `Opción C para pregunta ${i}`,
          is_correct: i % 4 === 3,
          type: "text"
        },
        {
          option_id: 4,
          content: `Opción D para pregunta ${i}`,
          is_correct: i % 4 === 0,
          type: "text"
        }
      ]
    });
  }
  
  return mockQuestions;
};

export default function PracticarExamenSimulacro() {
  const examConfig = useExamParams();
  const [questions] = useState<ExamQuestion[]>(() => generateMockExam(examConfig.area));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map());
  const [examComplete, setExamComplete] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [examStartTime] = useState(Date.now());
  const [finalTime, setFinalTime] = useState<string | null>(null);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const selectedAnswer = userAnswers.get(currentQuestion.question_id) ?? null;
  const answeredCount = userAnswers.size;
  const canFinishExam = answeredCount === 120;

  // Calcular tiempo transcurrido
  const calculateElapsedTime = useCallback(() => {
    const elapsed = Math.floor((Date.now() - examStartTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const mins = Math.floor((elapsed % 3600) / 60);
    const secs = elapsed % 60;
    return `${hours}h ${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  }, [examStartTime]);

  // Manejar selección de respuesta
  const handleAnswerSelect = useCallback((answerIndex: number) => {
    setUserAnswers(prev => {
      const newAnswers = new Map(prev);
      newAnswers.set(currentQuestion.question_id, answerIndex);
      return newAnswers;
    });
  }, [currentQuestion.question_id]);

  // Navegación entre preguntas
  const goToQuestion = useCallback((questionIndex: number) => {
    if (questionIndex >= 0 && questionIndex < 120) {
      setCurrentQuestionIndex(questionIndex);
      setShowNavigation(false);
    }
  }, []);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < 119) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex]);

  const goToPrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Finalizar examen
  const finishExam = useCallback(() => {
    if (canFinishExam) {
      const time = calculateElapsedTime();
      setFinalTime(time);
      setExamComplete(true);
    }
  }, [canFinishExam, calculateElapsedTime]);

  // Toggle navegación
  const toggleNavigation = useCallback(() => {
    setShowNavigation(prev => !prev);
  }, []);

  if (examComplete) {
    return (
      <ExamSummary
        questions={questions}
        userAnswers={userAnswers}
        totalTime={finalTime}
        area={examConfig.area}
      />
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-(--principal-main-color)">
      {/* Header */}
      <ExamHeader 
        area={examConfig.area}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={120}
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
          {/* Pregunta - Ajustado para móvil */}
          <div className="flex-1 overflow-y-auto">
            {/* Container centrado para móvil */}
            <div className="min-h-full flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-4xl">
                <ExamQuestionCard
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelect={handleAnswerSelect}
                />
              </div>
            </div>
            {/* Espaciado adicional para controles móviles */}
            <div className="h-32 md:h-0"></div>
          </div>

          {/* Controles de navegación - Sticky en móvil */}
          <div className="bg-(--principal-secondary-color) border-t border-(--shadow) 
                        sticky bottom-0 z-10 p-4 md:relative md:bottom-auto">
            {/* Versión móvil */}
            <div className="md:hidden space-y-3">
              {/* Primera fila: Estado y botón finalizar */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-(--text) font-medium">
                  {answeredCount}/120 respondidas
                </span>
                <Button
                  onClick={finishExam}
                  disabled={!canFinishExam}
                  variant={canFinishExam ? "correct" : "normal"}
                  className={`text-sm px-3 py-2 ${!canFinishExam ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {canFinishExam ? 'Finalizar' : `Faltan ${120 - answeredCount}`}
                </Button>
              </div>
              
              {/* Segunda fila: Navegación */}
              <div className="flex justify-center gap-3">
                <Button
                  onClick={goToPrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="normal"
                  className={`flex-1 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  ← Anterior
                </Button>
                <Button
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === 119}
                  variant="normal"
                  className={`flex-1 ${currentQuestionIndex === 119 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Siguiente →
                </Button>
              </div>
            </div>

            {/* Versión desktop (original) */}
            <div className="hidden md:block">
              <div className="max-w-4xl mx-auto flex justify-between items-center">
                {/* Navegación anterior/siguiente */}
                <div className="flex gap-2">
                  <Button
                    onClick={goToPrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    variant="normal"
                    className={`${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    ← Anterior
                  </Button>
                  <Button
                    onClick={goToNextQuestion}
                    disabled={currentQuestionIndex === 119}
                    variant="normal"
                    className={`${currentQuestionIndex === 119 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Siguiente →
                  </Button>
                </div>

                {/* Estado y botón finalizar */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-(--text)">
                    {answeredCount}/120 respondidas
                  </span>
                  <Button
                    onClick={finishExam}
                    disabled={!canFinishExam}
                    variant={canFinishExam ? "correct" : "normal"}
                    className={`${!canFinishExam ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {canFinishExam ? 'Finalizar Examen' : `Faltan ${120 - answeredCount}`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}