"use client";
import { useMemo } from "react";
import { ExamQuestion } from "@/types/exam";

interface ExamNavigationProps {
  questions: ExamQuestion[];
  userAnswers: Map<number, number>;
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  isVisible: boolean;
  onClose: () => void;
}

export default function ExamNavigation({
  questions,
  userAnswers,
  currentQuestionIndex,
  onQuestionSelect,
  isVisible,
  onClose
}: ExamNavigationProps) {
  // Agrupar preguntas por materia
  const questionsBySubject = useMemo(() => {
    const grouped: Record<string, { question: ExamQuestion; index: number }[]> = {};
    
    questions.forEach((question, index) => {
      if (!grouped[question.subject]) {
        grouped[question.subject] = [];
      }
      grouped[question.subject].push({ question, index });
    });
    
    return grouped;
  }, [questions]);

  const getQuestionStatus = (questionIndex: number) => {
    const questionId = questions[questionIndex].question_id;
    const isAnswered = userAnswers.has(questionId);
    const isCurrent = questionIndex === currentQuestionIndex;
    
    if (isCurrent) return 'current';
    if (isAnswered) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-(--blue-main) text-white border-(--blue-main)';
      case 'answered':
        return 'bg-(--green-main) text-white border-(--green-secondary)';
      default:
        return 'bg-(--principal-secondary-color) text-(--text) border-(--shadow) hover:bg-(--shadow)';
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay para móvil */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Panel de navegación */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full w-80 bg-(--principal-secondary-color) 
        border-r border-(--shadow) z-50 transform transition-transform lg:transform-none
        ${isVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header del panel */}
        <div className="p-4 border-b border-(--shadow) flex justify-between items-center">
          <h3 className="font-semibold text-(--text)">Navegación</h3>
          <button
            onClick={onClose}
            className="lg:hidden text-(--text) hover:text-(--blue-main)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="p-4 border-b border-(--shadow)">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-(--principal-main-color) rounded">
              <div className="text-lg font-bold text-(--blue-main)">
                {currentQuestionIndex + 1}
              </div>
              <div className="text-xs text-gray-500">Actual</div>
            </div>
            <div className="p-2 bg-(--principal-main-color) rounded">
              <div className="text-lg font-bold text-(--green-main)">
                {userAnswers.size}
              </div>
              <div className="text-xs text-gray-500">Respondidas</div>
            </div>
            <div className="p-2 bg-(--principal-main-color) rounded">
              <div className="text-lg font-bold text-gray-500">
                {120 - userAnswers.size}
              </div>
              <div className="text-xs text-gray-500">Pendientes</div>
            </div>
          </div>
        </div>

        {/* Lista de preguntas por materia */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(questionsBySubject).map(([subject, questionsInSubject]) => (
            <div key={subject} className="space-y-2">
              {/* Nombre de la materia */}
              <h4 className="font-medium text-(--text) text-sm border-b border-(--shadow) pb-1">
                {subject}
              </h4>
              
              {/* Grid de preguntas */}
              <div className="grid grid-cols-6 gap-2">
                {questionsInSubject.map(({ question, index }) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={question.question_id}
                      onClick={() => onQuestionSelect(index)}
                      className={`
                        w-10 h-10 rounded border-2 font-medium text-sm transition-colors
                        ${getStatusColor(status)}
                      `}
                      title={`Pregunta ${index + 1} - ${subject}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Leyenda */}
        <div className="p-4 border-t border-(--shadow) space-y-2">
          <h4 className="font-medium text-(--text) text-sm">Leyenda:</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-(--blue-main)"></div>
              <span>Pregunta actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-(--green-main)"></div>
              <span>Respondida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-(--principal-secondary-color) border border-(--shadow)"></div>
              <span>Sin responder</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}