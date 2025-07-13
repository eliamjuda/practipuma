"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import ReactKatex from "@pkasila/react-katex";
import Button from "@/components/ui/buttonPP";
import BarChart from "@/components/ui/BarChart";
import { ExamQuestion, ExamArea, AREA_NAMES } from "@/types/exam";

interface ExamSummaryProps {
  questions: ExamQuestion[];
  userAnswers: Map<number, number>;
  totalTime: string | null;
  area: ExamArea;
}

interface SubjectStats {
  subject: string;
  total: number;
  correct: number;
  percentage: number;
  questions: {
    question: ExamQuestion;
    userAnswer: number | null;
    isCorrect: boolean;
  }[];
}

const LETTERS = ["A", "B", "C", "D"];

export default function ExamSummary({
  questions,
  userAnswers,
  totalTime,
  area
}: ExamSummaryProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calcular estadísticas generales
  const stats = useMemo(() => {
    let correctCount = 0;
    
    questions.forEach(question => {
      const userAnswerIndex = userAnswers.get(question.question_id);
      if (userAnswerIndex !== undefined) {
        const isCorrect = question.answers[userAnswerIndex]?.is_correct || false;
        if (isCorrect) correctCount++;
      }
    });

    const totalAnswered = userAnswers.size;
    const incorrectCount = totalAnswered - correctCount;
    const percentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    return {
      total: questions.length,
      answered: totalAnswered,
      correct: correctCount,
      incorrect: incorrectCount,
      percentage
    };
  }, [questions, userAnswers]);

  // Calcular estadísticas por materia
  const subjectStats = useMemo(() => {
    const statsMap: Record<string, SubjectStats> = {};

    questions.forEach(question => {
      const subject = question.subject;
      const userAnswerIndex = userAnswers.get(question.question_id);
      const isCorrect = userAnswerIndex !== undefined ? 
        (question.answers[userAnswerIndex]?.is_correct || false) : false;

      if (!statsMap[subject]) {
        statsMap[subject] = {
          subject,
          total: 0,
          correct: 0,
          percentage: 0,
          questions: []
        };
      }

      statsMap[subject].total++;
      if (isCorrect) statsMap[subject].correct++;
      
      statsMap[subject].questions.push({
        question,
        userAnswer: userAnswerIndex ?? null,
        isCorrect
      });
    });

    // Calcular porcentajes
    Object.values(statsMap).forEach(stat => {
      stat.percentage = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    });

    return Object.values(statsMap);
  }, [questions, userAnswers]);

  // Paginación
  const totalPages = Math.ceil(subjectStats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubjects = subjectStats.slice(startIndex, startIndex + itemsPerPage);

  // Mensaje motivacional
  const getMotivationalMessage = () => {
    if (stats.percentage >= 90) return "¡Excelente! Dominas perfectamente el área 🏆";
    if (stats.percentage >= 80) return "¡Muy bien! Tienes un gran conocimiento 🔥";
    if (stats.percentage >= 70) return "¡Buen trabajo! Vas en la dirección correcta 💪";
    if (stats.percentage >= 60) return "¡Bien! Sigue estudiando para mejorar 📚";
    return "¡No te desanimes! Identifica tus áreas de oportunidad 💡";
  };

  // Obtener color del porcentaje
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return "text-(--green-main)";
    if (percentage >= 60) return "text-(--blue-main)";
    return "text-(--red-main)";
  };

  const selectedSubjectData = selectedSubject ? 
    subjectStats.find(s => s.subject === selectedSubject) : null;

  return (
    <div className="min-h-screen bg-(--principal-main-color) text-(--text)">
      {/* Header */}
      <div className="bg-(--principal-secondary-color) border-b border-(--shadow) p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Resultados del Examen</h1>
            <p className="text-sm text-gray-500">{AREA_NAMES[area]}</p>
          </div>
          <Link href="/dashboard">
            <Button variant="normal">Volver al inicio</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Resultado principal */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Porcentaje principal */}
          <div className="md:col-span-1">
            <div className="bg-(--principal-secondary-color) border border-(--shadow) rounded-xl p-6 text-center">
              <h2 className={`text-5xl font-bold mb-2 ${getPercentageColor(stats.percentage)}`}>
                {stats.percentage}%
              </h2>
              <p className="text-lg text-(--text)">de acierto</p>
              <p className="text-sm text-gray-500 mt-2">
                {stats.correct} de {stats.answered} respondidas correctamente
              </p>
            </div>
          </div>

          {/* Estadísticas generales */}
          <div className="md:col-span-2">
            <div className="bg-(--principal-secondary-color) border border-(--shadow) rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">📊 Estadísticas Generales</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-(--principal-main-color) rounded-lg">
                  <div className="text-2xl font-bold text-(--blue-main)">{stats.total}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center p-3 bg-(--principal-main-color) rounded-lg">
                  <div className="text-2xl font-bold text-(--green-main)">{stats.correct}</div>
                  <div className="text-xs text-gray-500">Correctas</div>
                </div>
                <div className="text-center p-3 bg-(--principal-main-color) rounded-lg">
                  <div className="text-2xl font-bold text-(--red-main)">{stats.incorrect}</div>
                  <div className="text-xs text-gray-500">Incorrectas</div>
                </div>
                <div className="text-center p-3 bg-(--principal-main-color) rounded-lg">
                  <div className="text-2xl font-bold text-(--text)">{totalTime}</div>
                  <div className="text-xs text-gray-500">Tiempo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje motivacional */}
        <div className="mb-8">
          <div className="bg-(--blue-main) text-white rounded-xl p-4 text-center font-semibold">
            {getMotivationalMessage()}
          </div>
        </div>

        {/* Resultados por materia y gráfica */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Rendimiento por materia */}
          <div className="bg-(--principal-secondary-color) border border-(--shadow) rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">📚 Rendimiento por Materia</h3>
            <p className="text-sm text-gray-500 mb-4">
              Haz clic en una materia para ver el detalle de las preguntas
            </p>
            
            <div className="space-y-3">
              {currentSubjects.map((subject) => (
                <button
                  key={subject.subject}
                  onClick={() => setSelectedSubject(subject.subject)}
                  className="w-full flex justify-between items-center p-3 bg-(--principal-main-color) 
                           border border-(--shadow) rounded-lg hover:bg-(--shadow) transition-colors"
                >
                  <span className="font-medium truncate">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${getPercentageColor(subject.percentage)}`}>
                      {subject.percentage}%
                    </span>
                    <span className="text-sm text-gray-500">
                      ({subject.correct}/{subject.total})
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <Button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  variant="normal"
                  className={currentPage === 1 ? 'opacity-50' : ''}
                >
                  ← Anterior
                </Button>
                <span className="text-sm text-gray-500">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  variant="normal"
                  className={currentPage === totalPages ? 'opacity-50' : ''}
                >
                  Siguiente →
                </Button>
              </div>
            )}
          </div>

          {/* Gráfica */}
          <div className="bg-(--principal-secondary-color) border border-(--shadow) rounded-xl p-6 flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-4 text-center">Distribución de Respuestas</h3>
            <BarChart 
              total={stats.total} 
              correct={stats.correct} 
              incorrect={stats.incorrect}
            />
          </div>
        </div>
      </div>

      {/* Modal de detalle de materia */}
      {selectedSubject && selectedSubjectData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-(--principal-secondary-color) rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header del modal */}
            <div className="p-6 border-b border-(--shadow) flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{selectedSubject}</h3>
                <p className="text-sm text-gray-500">
                  {selectedSubjectData.correct} de {selectedSubjectData.total} correctas 
                  ({selectedSubjectData.percentage}%)
                </p>
              </div>
              <button
                onClick={() => setSelectedSubject(null)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {selectedSubjectData.questions.map((item) => {
                  const { question, userAnswer, isCorrect } = item;

                  return (
                    <div key={question.question_id} className="border border-(--shadow) rounded-lg p-4 bg-(--principal-main-color)">
                      {/* Header de la pregunta */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-semibold text-gray-500">
                          Pregunta {question.question_id}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          isCorrect 
                            ? 'bg-(--green-main) text-white' 
                            : 'bg-(--red-main) text-white'
                        }`}>
                          {isCorrect ? 'Correcta' : 'Incorrecta'}
                        </span>
                      </div>

                      {/* Enunciado */}
                      <div className="mb-4 font-medium">
                        <ReactKatex>{question.statement}</ReactKatex>
                      </div>

                      {/* Opciones */}
                      <div className="space-y-2">
                        {question.answers.map((answer, answerIndex) => {
                          const isUserSelection = userAnswer === answerIndex;
                          const isCorrectAnswer = answer.is_correct;
                          
                          let bgColor = 'bg-(--principal-secondary-color)';
                          let borderColor = 'border-(--shadow)';
                          let textColor = 'text-(--text)';
                          
                          if (isCorrectAnswer) {
                            bgColor = 'bg-(--green-main)';
                            borderColor = 'border-(--green-secondary)';
                            textColor = 'text-white';
                          } else if (isUserSelection && !isCorrect) {
                            bgColor = 'bg-(--red-main)';
                            borderColor = 'border-(--red-secondary)';
                            textColor = 'text-white';
                          }

                          return (
                            <div 
                              key={answer.option_id}
                              className={`flex items-center gap-3 p-3 rounded-lg border ${bgColor} ${borderColor}`}
                            >
                              <div className={`flex items-center justify-center w-8 h-8 rounded font-bold ${
                                isCorrectAnswer ? 'bg-white text-(--green-main)' : 
                                isUserSelection && !isCorrect ? 'bg-white text-(--red-main)' : 
                                'bg-(--principal-main-color) text-(--text)'
                              }`}>
                                {isCorrectAnswer ? '✓' : 
                                 isUserSelection && !isCorrect ? '✗' : 
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
                                <span className={`text-xs font-medium ${textColor}`}>
                                  Tu respuesta
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explicación */}
                      {question.explanation && (
                        <div className="mt-4 p-3 bg-(--principal-secondary-color) rounded-lg border border-(--shadow)">
                          <h4 className="font-semibold text-(--text) mb-2">💡 Explicación:</h4>
                          <div className="text-(--text) text-sm">
                            <ReactKatex>{question.explanation}</ReactKatex>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer del modal */}
            <div className="p-6 border-t border-(--shadow)">
              <Button onClick={() => setSelectedSubject(null)} className="w-full">
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}