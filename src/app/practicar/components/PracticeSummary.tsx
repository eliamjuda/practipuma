import { useState } from "react";
import Button from "@/components/ui/buttonPP";
import Header from "./Header";
import BarChart from "@/components/ui/BarChart";
import { PracticeQuestion } from "@/types/practice";

interface PracticeSummaryProps {
  userAnswers?: {questionId: number, selectedAnswer: number, isCorrect: boolean}[];
  totalQuestions: number;
  totalTime: string | null; // tiempo total en segundos
  timeExpired: boolean;
  questions?: PracticeQuestion[]; // Array de preguntas para obtener subtemas
}

export default function PracticeSummary({
  userAnswers = [],
  totalQuestions,
  totalTime,
  timeExpired,
  questions = []
}: PracticeSummaryProps) {
  const [currentPage, setCurrentPage] = useState(1);
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
      acc[subtema] = { nombre: subtema, aciertos: 0, total: 0 };
    }
    
    acc[subtema].total++;
    if (userAnswer && userAnswer.isCorrect) {
      acc[subtema].aciertos++;
    }
    
    return acc;
  }, {} as Record<string, { nombre: string, aciertos: number, total: number }>) || {};

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

  // Mensaje motivacional basado en el rendimiento
  const getMotivationalMessage = () => {
    if (accuracyPercentage >= 90) return "¡Excelente! Estás dominando el tema 🏆";
    if (accuracyPercentage >= 75) return "¡Muy bien! Vas por buen camino 🔥";
    if (accuracyPercentage >= 60) return "¡Buen trabajo! Sigue practicando 💪";
    return "¡No te rindas! La práctica hace al maestro 📚";
  };

  const getAccuracyColor = () => {
    if (accuracyPercentage >= 75) return "text-green-500";
    if (accuracyPercentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen min-w-full bg-(--principal-main-color) text-(--text) flex flex-col justify-center content-center items-center">
        <div className="md:w-[50%] w-full px-4 py-6 md:py-10">
          {/* Precisión central */}
          <div className="border-1 border-(--shadow) bg-(--principal-secondary-color) rounded-xl p-6 md:p-10 w-full mb-2 text-center">
            <h2 className={`text-4xl md:text-5xl font-bold ${getAccuracyColor()}`}>
              {accuracyPercentage}%
            </h2>
            <p className="text-lg">de acierto</p>
            {timeExpired && (
              <p className="text-red-400 text-sm mt-2">⏰ Tiempo agotado</p>
            )}
          </div>
          
          {/* Mensaje motivacional */}
          <button className="bg-(--blue-main) rounded-xl w-full py-3 font-semibold mb-2">
            <p>{getMotivationalMessage()}</p>
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
                    >
                      <span>{subtema.nombre}</span>
                      <span className={subtema.aciertos === subtema.total ? 'text-green-500' : 'text-yellow-500'}>
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
          <div className="flex flex-col md:flex-row gap-4 mt-10 w-full justify-center">
            <Button>
              Ir a inicio    
            </Button>
            <Button>
              Volver a practicar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}