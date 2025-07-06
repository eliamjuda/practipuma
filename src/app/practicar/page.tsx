"use client";
import { useState } from "react";
import OptionCard from "./components/OptionCard";
import ReactKatex from "@pkasila/react-katex";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import Button from "@/components/ui/buttonPP";
import { PracticeQuestion } from "@/types/practice";

const LETTERS = ["A", "B", "C", "D"];

// Datos de ejemplo con múltiples preguntas
const mockQuestions: PracticeQuestion[] = [
  {
    question: {
      question_id: 1,
      statement: "¿Cuál de las siguientes funciones tiene un comportamiento creciente?",
      explanation: "La respuesta correcta es f(x) = x³, ya que su derivada 3x² es siempre positiva para x ≠ 0.",
      type: "text",
    },
    answers: [
      { option_id: 1, content: "$ f(x) = \\frac{3}{x} $", is_correct: false, type: "latex" },
      { option_id: 2, content: "$ f(x) = -3^{-x} $", is_correct: false, type: "latex" },
      { option_id: 3, content: "$ f(x) = -3x $", is_correct: false, type: "latex" },
      { option_id: 4, content: "$ f(x) = x^3 $", is_correct: true, type: "latex" },
    ],
  },
  {
    question: {
      question_id: 2,
      statement: "¿Cuál es la derivada de f(x) = 2x² + 3x - 1?",
      explanation: "La derivada se calcula aplicando la regla de la potencia: d/dx(ax^n) = nax^(n-1).",
      type: "text",
    },
    answers: [
      { option_id: 1, content: "$ f'(x) = 4x + 3 $", is_correct: true, type: "latex" },
      { option_id: 2, content: "$ f'(x) = 2x + 3 $", is_correct: false, type: "latex" },
      { option_id: 3, content: "$ f'(x) = 4x² + 3x $", is_correct: false, type: "latex" },
      { option_id: 4, content: "$ f'(x) = x + 3 $", is_correct: false, type: "latex" },
    ],
  },
  {
    question: {
      question_id: 3,
      statement: "¿Cuál es el límite de (x² - 4)/(x - 2) cuando x tiende a 2?",
      explanation: "Se puede factorizar el numerador: (x² - 4) = (x + 2)(x - 2), por lo que el límite es 4.",
      type: "text",
    },
    answers: [
      { option_id: 1, content: "$ 2 $", is_correct: false, type: "latex" },
      { option_id: 2, content: "$ 4 $", is_correct: true, type: "latex" },
      { option_id: 3, content: "$ 0 $", is_correct: false, type: "latex" },
      { option_id: 4, content: "$ \\infty $", is_correct: false, type: "latex" },
    ],
  },
  {
    question: {
      question_id: 4,
      statement: "¿Cuál es la integral de f(x) = 3x²?",
      explanation: "La integral de 3x² es x³ + C, aplicando la regla de integración de potencias.",
      type: "text",
    },
    answers: [
      { option_id: 1, content: "$ 6x + C $", is_correct: false, type: "latex" },
      { option_id: 2, content: "$ x³ + C $", is_correct: true, type: "latex" },
      { option_id: 3, content: "$ 3x³ + C $", is_correct: false, type: "latex" },
      { option_id: 4, content: "$ \\frac{x³}{3} + C $", is_correct: false, type: "latex" },
    ],
  },
  {
    question: {
      question_id: 5,
      statement: "¿Qué representa la segunda derivada de una función?",
      explanation: "La segunda derivada indica la concavidad de la función y los puntos de inflexión.",
      type: "text",
    },
    answers: [
      { option_id: 1, content: "La pendiente de la función", is_correct: false, type: "text" },
      { option_id: 2, content: "La concavidad de la función", is_correct: true, type: "text" },
      { option_id: 3, content: "El área bajo la curva", is_correct: false, type: "text" },
      { option_id: 4, content: "Los puntos críticos", is_correct: false, type: "text" },
    ],
  },
];

export default function Practicar() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{questionId: number, selectedAnswer: number, isCorrect: boolean}[]>([]);
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  const totalQuestions = mockQuestions.length;
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelect = (index: number) => {
    if (!confirmed) setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption !== null) {
      const isCorrect = currentQuestion.answers[selectedOption].is_correct;
      setUserAnswers(prev => [...prev, {
        questionId: currentQuestion.question.question_id,
        selectedAnswer: selectedOption,
        isCorrect: isCorrect
      }]);
      setConfirmed(true);
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      // Ir a la siguiente pregunta
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setConfirmed(false);
    } else {
      // Completar la práctica
      setPracticeComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setConfirmed(false);
    setPracticeComplete(false);
    setUserAnswers([]);
    setShowExplanationModal(false);
  };

  const handleReport = () => {
    // Aquí puedes implementar la lógica para reportar la pregunta
    console.log(`Reportando pregunta ${currentQuestion.question.question_id}`);
    // Podrías enviar a una API o mostrar un formulario
    alert('Pregunta reportada. Gracias por tu feedback.');
  };

  const handleShowExplanation = () => {
    setShowExplanationModal(true);
  };

  const handleCloseExplanation = () => {
    setShowExplanationModal(false);
  };

  // Determinar si la respuesta seleccionada es correcta
  const isSelectedCorrect = selectedOption !== null ? currentQuestion.answers[selectedOption].is_correct : false;

  // Determinar el texto y estilo del botón
  const getButtonText = () => {
    if (!confirmed) return "Confirmar";
    if (currentQuestionIndex < totalQuestions - 1) return "Continuar";
    return "Finalizar";
  };

  const getButtonVariant = () => {
    if (!confirmed) return "normal";
    return isSelectedCorrect ? "correct" : "incorrect";
  };

  // Calcular estadísticas finales
  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  if (practiceComplete) {
    return (
      <div className="h-screen w-screen flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto flex justify-center items-center">
          <div className="w-full md:w-[30%] p-2 md:p-8 text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">¡Práctica Completada!</h2>
              <div className="text-6xl mb-4">{scorePercentage >= 70 ? '🎉' : '📚'}</div>
              <div className="text-xl mb-2">
                Puntuación: {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-lg text-gray-600">
                {scorePercentage}% de respuestas correctas
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Resumen de respuestas:</h3>
              <div className="space-y-2">
                {userAnswers.map((answer, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded border">
                    <span>Pregunta {index + 1}</span>
                    <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {answer.isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleRestart} variant="normal">
              Practicar de Nuevo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <div className="flex-1 overflow-y-auto flex justify-center">
        <div className="w-full md:w-[30%] p-2 md:p-8">
          <ProgressBar 
            current={currentQuestionIndex + 1} 
            total={totalQuestions} 
            progress={progress} 
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
                  onClick={handleCloseExplanation}
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

      <div className=" bg-(--principal-secondary-color) sticky bottom-0 w-full border-t border-(--shadow) min-h-[100px] py-6 flex flex-col justify-center items-center">
        {/* Iconos de acción - Solo se muestran después de confirmar */}
        {confirmed && (
          <div className="flex gap-6 mb-4">
                        <button
              onClick={handleShowExplanation}
              className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors"
            >
              <svg className="cursor-pointer w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">Justificación</span>
            </button>
            <button
              onClick={handleReport}
              className=" flex flex-col items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <svg className="cursor-pointer w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              <span className="text-xs">Reportar</span>
            </button>
            

          </div>
        )}
        
        <Button 
          onClick={confirmed ? handleContinue : handleConfirm}
          disabled={selectedOption === null}
          variant={getButtonVariant()}
          className={`${selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}