import { useState } from "react";
import Button from "@/components/ui/buttonPP";
import Header from "./Header";
import BarChart from "@/components/ui/BarChart";
import { PracticeQuestion } from "@/types/practice";
import ReactKatex from "@pkasila/react-katex";
import Link from "next/link";

interface PracticeSummaryProps {
  userAnswers?: {questionId: number, selectedAnswer: number, isCorrect: boolean}[];
  totalQuestions: number;
  totalTime: string | null; // tiempo total en segundos
  timeExpired: boolean;
  questions?: PracticeQuestion[]; // Array de preguntas para obtener subtemas
}

const LETTERS = ["A", "B", "C", "D"];

export default function PracticeSummary({
  userAnswers = [],
  totalQuestions,
  totalTime,
  timeExpired,
  questions = []
}: PracticeSummaryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubtema, setSelectedSubtema] = useState<string | null>(null);
  const itemsPerPage = 3;

  // Calcular estadísticas reales con validación
  const correctAnswers = userAnswers?.filter(answer => answer.isCorrect).length || 0;
  const incorrectAnswers = (userAnswers?.length || 0) - correctAnswers;
  const accuracyPercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Agrupar respuestas por subtema con validación
  const subtemaStats = questions?.reduce((acc, question) => {
    const subtema = question.question.subtopic;
    const userAnswer = userAnswers?.find(ua => ua.questionId === question.question.question_id);
    
    if (!acc[subtema]) {
      acc[subtema] = { 
        nombre: subtema, 
        aciertos: 0, 
        total: 0,
        preguntas: []
      };
    }
    
    acc[subtema].total++;
    acc[subtema].preguntas.push({
      question: question,
      userAnswer: userAnswer || null
    });
    
    if (userAnswer && userAnswer.isCorrect) {
      acc[subtema].aciertos++;
    }
    
    return acc;
  }, {} as Record<string, { 
    nombre: string, 
    aciertos: number, 
    total: number,
    preguntas: {
      question: PracticeQuestion,
      userAnswer: {questionId: number, selectedAnswer: number, isCorrect: boolean} | null
    }[]
  }>) || {};

  const subtemasArray = Object.values(subtemaStats);

  // Calcular datos para la página actual
  const totalPages = Math.ceil(subtemasArray.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = subtemasArray.slice(startIndex, endIndex);

  // Funciones para navegar
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para abrir modal
  const openSubtemaModal = (subtema: string) => {
    setSelectedSubtema(subtema);
  };

  // Función para cerrar modal
  const closeModal = () => {
    setSelectedSubtema(null);
  };

  // Obtener datos del subtema seleccionado
  const selectedSubtemaData = selectedSubtema ? subtemaStats[selectedSubtema] : null;

  // Mensaje motivacional basado en el rendimiento
  const getShittyMessage = () => {
    if (accuracyPercentage >= 90) return "¡Excelente! Estás dominando el tema 🏆";
    if (accuracyPercentage >= 75) return "¡Muy bien! Vas por buen camino 🔥";
    if (accuracyPercentage >= 60) return "¡Buen trabajo! Sigue practicando 💪";
    return "¡No te rindas! La práctica hace al maestro 📚";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen min-w-full bg-(--principal-main-color) text-(--text) flex flex-col justify-center content-center items-center">
        <div className="md:w-[50%] w-full px-4 py-6 md:py-10">
          {/* Precisión central */}
          <div className="border-1 border-(--shadow) bg-(--principal-secondary-color) rounded-xl p-6 md:p-10 w-full mb-2 text-center">
            <h2 className={`text-4xl md:text-5xl font-bold text-(--blue-main)`}>
              {accuracyPercentage}%
            </h2>
            <p className="text-lg">de acierto</p>
            {timeExpired && (
              <p className="text-red-400 text-sm mt-2">⏰ Tiempo agotado</p>
            )}
          </div>
          
          {/* Mensaje motivacional */}
          <button className="bg-(--blue-main) rounded-xl w-full py-3 font-semibold mb-2 text-white px-2">
            <p>{getShittyMessage()}</p>
          </button>
          
          {/* Estadísticas */}
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
            {/* Panel de datos */}
            <div className="border-1 border-(--shadow) flex-1 bg-(--principal-secondary-color) rounded-xl p-6 space-y-6">
              {/* General */}
              <div>
                <h3 className="text-(--text) font-bold text-lg mb-2">📊 General</h3>
                <p>
                  🎯 Precisión: <span className="font-semibold">{accuracyPercentage}%</span> ({correctAnswers} de {totalQuestions})
                </p>
                <p>
                  ⏰ Tiempo total: <span className="font-semibold">{totalTime}</span>
                </p>
              </div>
              
              {/* Rendimiento por subtema */}
              <div>
                <h3 className="text-(--text) font-bold text-lg">
                  📚 Rendimiento por subtema
                </h3>
                <p className="m-2 text-sm">
                  ℹ️ Dale clic a una para ver más información 
                </p>
                <div className="space-y-2">
                  {currentItems.map((subtema, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between bg-(--principal-main-color) border border-(--shadow) rounded-lg px-4 py-2 cursor-pointer hover:bg-(--shadow) transition-colors"
                      onClick={() => openSubtemaModal(subtema.nombre)}
                    >
                      <span className="truncate max-w-55">{subtema.nombre}</span>
                      <span>
                        {subtema.aciertos}/{subtema.total}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Paginador */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-3 text-sm text-zinc-400">
                    <button 
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`bg-(--shadow) rounded p-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-white cursor-pointer'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 12l14 0" />
                        <path d="M5 12l4 4" />
                        <path d="M5 12l4 -4" />
                      </svg>
                    </button>
                    <span>{currentPage}/{totalPages}</span>
                    <button 
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`bg-(--shadow) rounded p-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-white cursor-pointer'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 12l14 0" />
                        <path d="M15 16l4 -4" />
                        <path d="M15 8l4 4" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Gráfica */}
            <div className="border-1 border-(--shadow) flex-1 bg-(--principal-secondary-color) rounded-xl p-6 flex flex-col justify-center items-center">
              <BarChart total={totalQuestions} correct={correctAnswers} incorrect={incorrectAnswers}/>
            </div>
          </div>
          
          {/* Botones finales */}
          <div className="flex flex-col md:flex-row gap-4 mt-10 items-center w-full justify-center">
            <Link href={"/dashboard"}>
              <Button>
                Ir a inicio    
              </Button>
            </Link>
            {/* <Link href={"/persona"}>
            <Button>
              Volver a practicar
            </Button>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Modal de detalles del subtema */}
      {selectedSubtema && selectedSubtemaData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-(--principal-secondary-color) rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="sticky top-0 bg-(--principal-secondary-color) border-b border-(--shadow) px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-(--text)">{selectedSubtema}</h3>
                <p className="text-sm text-gray-500">
                  {selectedSubtemaData.aciertos} de {selectedSubtemaData.total} correctas
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 cursor-pointer hover:text-gray-700 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 space-y-6">
              {selectedSubtemaData.preguntas.map((item, index) => {
                const { question, userAnswer } = item;
                const isCorrect = userAnswer?.isCorrect || false;
                const userSelectedIndex = userAnswer?.selectedAnswer ?? -1;
                // const correctAnswerIndex = question.answers.findIndex(ans => ans.is_correct);

                return (
                  <div key={question.question.question_id} className="border border-(--shadow) rounded-lg p-4 bg-(--principal-main-color)">
                    {/* Pregunta */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-500">
                          Pregunta {index + 1}
                        </span>
                        {userAnswer ? (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            isCorrect 
                              ? 'bg-(--green-main) text-(--text) border-1 border-(--gren-secondary)' 
                              : 'bg-(--red-main) text-(--text) border-1 border-(--red-secondary)'
                          }`}>
                            {isCorrect ? 'Correcta' : 'Incorrecta'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Sin respuesta
                          </span>
                        )}
                      </div>
                      <div className="text-(--text) font-medium">
                        <ReactKatex>{question.question.statement}</ReactKatex>
                      </div>
                    </div>

                    {/* Opciones */}
                    <div className="space-y-2">
                      {question.answers.map((answer, answerIndex) => {
                        const isUserSelection = userSelectedIndex === answerIndex;
                        const isCorrectAnswer = answer.is_correct;
                        
                        let bgColor = 'bg-(--principal-secondary-color)';
                        let textColor = 'text-(--text)';
                        let borderColor = 'border-(--shadow)';
                        
                        if (isCorrectAnswer) {
                          bgColor = 'bg-(--green-main)';
                          textColor = 'text-(--text)';
                          borderColor = 'border-(--green-secondary)';
                        } else if (isUserSelection && !isCorrect) {
                          bgColor = 'bg-(--red-main)';
                          textColor = 'text-(--text)';
                          borderColor = 'border-(--red-secondary)';
                        }

                        return (
                          <div 
                            key={answer.option_id}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${bgColor} ${borderColor}`}
                          >
                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold ${
                              isCorrectAnswer ? 'bg-green-500 text-white' : 
                              isUserSelection && !isCorrect ? 'bg-red-500 text-white' : 
                              'bg-(--principal-main-color) text-(--text) border-(--shadow) border-1'
                            }`}>
                              {isCorrectAnswer ? '✓' : 
                               isUserSelection && !isCorrect ? 'X' : 
                               LETTERS[answerIndex]}
                            </div>
                            <div className={`flex-1 ${textColor}`}>
                              {answer.type === 'latex' ? (
                                <ReactKatex>{answer.content}</ReactKatex>
                              ) : (
                                answer.content
                              )}
                            </div>
                            {isUserSelection && (
                              <span className="text-xs font-medium text-(--text)">
                                Tu respuesta
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explicación si está disponible */}
                    {question.question.explanation && (
                      <div className="mt-4 p-3 bg-(--principal-secondary-color) rounded-lg border border-(--shadow)">
                        <h4 className="font-semibold text-(--text) mb-2">💡 Explicación:</h4>
                        <div className="text-(--text) text-sm">
                          <ReactKatex>{question.question.explanation}</ReactKatex>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer del modal */}
            <div className="sticky bottom-0 bg-(--principal-secondary-color) border-t border-(--shadow) px-6 py-4">
              <Button onClick={closeModal} className="w-full">
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}