"use client";
import ReactKatex from "@pkasila/react-katex";
import { ExamQuestion } from "@/types/exam";

interface ExamQuestionCardProps {
  question: ExamQuestion;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
}

const LETTERS = ["A", "B", "C", "D"];

export default function ExamQuestionCard({
  question,
  selectedAnswer,
  currentQuestionIndex,
  onAnswerSelect
}: ExamQuestionCardProps) {
  return (
    <div className="w-full">
      {/* Header de la pregunta - Responsive */}
      <div className="mb-4 md:mb-6">
        <div className="flex flex-row gap-2 sm:gap-3 mb-3 md:mb-4">
          <span className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-(--blue-main) text-white">
            Pregunta {currentQuestionIndex}
          </span>
          <span className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-(--principal-secondary-color) text-(--text) border border-(--shadow)">
            {question.subject}
          </span>
        </div>
      </div>

      {/* Enunciado de la pregunta - Responsive */}
      <div className="mb-6 md:mb-8">
        <div className=" min-h-[200px] flex justify-center items-center rounded-lg p-4 md:p-6">
          <div className="text-base md:text-lg lg:text-xl leading-relaxed text-(--text)">
              <ReactKatex>{question.statement}</ReactKatex>
          </div>
        </div>
      </div>

      {/* Opciones de respuesta - Responsive */}
      <div className="space-y-2 md:space-y-3">
        {question.answers.map((answer, index) => {
          const isSelected = selectedAnswer === index;
          
          return (
            <button
              key={answer.option_id}
              onClick={() => onAnswerSelect(index)}
              className={`
                w-full p-2 cursor-pointer rounded-lg flex border-2 text-left transition-all duration-200
                ${isSelected 
                  ? 'border-(--blue-main) bg-(--bg-stage)' 
                  : 'border-(--shadow) bg-(--principal-secondary-color) hover:border-(--shadow-hover) hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center gap-3 md:gap-4">
                {/* Letra de la opción - Responsive */}
                <div className={`
                  flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-bold text-base md:text-lg
                  ${isSelected 
                    ? ' bg-(--blue-main) text-white' 
                    : 'bg-(--principal-secondary-color) text-(--text) border border-(--shadow)'
                  }
                `}>
                  {LETTERS[index]}
                </div>
                
                {/* Contenido de la respuesta - Responsive */}
                <div className="flex-1 text-(--text) flex items-center max-w-full text-sm md:text-base leading-relaxed">
                    <span><ReactKatex>{answer.content}</ReactKatex></span>
                </div>
              
              </div>
            </button>
          );
        })}
      </div>

      {/* Instrucciones adicionales - Responsive */}
      {/* <div className="mt-6 md:mt-8 p-3 md:p-4 bg-(--principal-secondary-color) border border-(--shadow) rounded-lg">
        <div className="flex items-start gap-2 md:gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-(--blue-main) flex-shrink-0 mt-0.5 md:w-5 md:h-5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 9h.01" />
            <path d="M11 12h1v4h1" />
            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9z" />
          </svg>
          <div className="text-xs md:text-sm text-gray-600">
            <p className="font-medium mb-1">Instrucciones:</p>
            <ul className="space-y-0.5 text-xs">
              <li>• Selecciona una opción para responder</li>
              <li>• Puedes navegar y cambiar respuestas</li>
              <li>• Responde todas para finalizar</li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
}