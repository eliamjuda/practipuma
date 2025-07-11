"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import OptionCard from "./components/OptionCard";
import ReactKatex from "@pkasila/react-katex";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import Button from "@/components/ui/buttonPP";
import { GameModes, PracticeQuestion } from "@/types/practice";
import { usePracticeParams } from "@/hooks/usePracticeParams";
import PracticeSummary from "./components/PracticeSummary";

const LETTERS = ["A", "B", "C", "D"];

// Datos de ejemplo con múltiples preguntas
const mockQuestions: PracticeQuestion[] = [
  {
    question: {
      question_id: 1,
      subject: "Matemáticas",
      subtopic: "Álgebra lineal",
      statement:
        "¿Cuál de las siguientes funciones tiene un comportamiento creciente?",
      explanation:
        "La respuesta correcta es f(x) = x³, ya que su derivada 3x² es siempre positiva para x ≠ 0.",
      type: "text",
    },
    answers: [
      {
        option_id: 1,
        content: "$ f(x) = \\frac{3}{x} $",
        is_correct: false,
        type: "latex",
      },
      {
        option_id: 2,
        content: "$ f(x) = -3^{-x} $",
        is_correct: false,
        type: "latex",
      },
      {
        option_id: 3,
        content: "$ f(x) = -3x $",
        is_correct: false,
        type: "latex",
      },
      {
        option_id: 4,
        content: "$ f(x) = x^3 $",
        is_correct: true,
        type: "latex",
      },
    ],
  },
  {
    question: {
      question_id: 2,
      subject: "Español",
      subtopic: "Un subtema bien larguísimo como la UNAM los pone a veces",
      statement: "¿Cuál es la derivada de f(x) = 2x² + 3x - 1?",
      explanation:
        "La derivada se calcula aplicando la regla de la potencia: d/dx(ax^n) = nax^(n-1).",
      type: "text",
    },
    answers: [
      {
        option_id: 1,
        content: "$ f'(x) = 4x + 3 $",
        is_correct: true,
        type: "latex",
      },
      {
        option_id: 2,
        content: "$ f'(x) = 2x + 3 $",
        is_correct: false,
        type: "latex",
      },
      {
        option_id: 3,
        content: "$ f'(x) = 4x² + 3x $",
        is_correct: false,
        type: "latex",
      },
      {
        option_id: 4,
        content: "$ f'(x) = x + 3 $",
        is_correct: false,
        type: "latex",
      },
    ],
  },
  {
    question: {
      question_id: 3,
      subject: "Geografía",
      subtopic: "Álgebra lineal",
      statement: "¿Cuál es el límite de (x² - 4)/(x - 2) cuando x tiende a 2?",
      explanation:
        "Se puede factorizar el numerador: (x² - 4) = (x + 2)(x - 2), por lo que el límite es 4.",
      type: "text",
    },
    answers: [
      { option_id: 1, content: "$ 2 $", is_correct: false, type: "latex" },
      { option_id: 2, content: "$ 4 $", is_correct: true, type: "latex" },
      { option_id: 3, content: "$ 0 $", is_correct: false, type: "latex" },
      {
        option_id: 4,
        content: "$ \\infty $",
        is_correct: false,
        type: "latex",
      },
    ],
  },
  {
    question: {
      question_id: 4,
      subject: "Literatura",
      subtopic: "Álgebra lineal",
      statement:
        "Fernando António Nogueira Pessoa (Lisboa, 13 de junio de 1888-ibidem, 30 de noviembre de 1935), conocido como Fernando Pessoa, fue un poeta, escritor, crítico literario, dramaturgo, ensayista, traductor, editor y filósofo portugués, descrito como una de las figuras literarias más importantes del siglo XX y uno de los grandes poetas en lengua portuguesa. También tradujo y escribió en inglés y francés. Se le ha llamado el poeta portugués más universal. Por haber sido educado en Sudáfrica, en una escuela católica irlandesa de Durban, llegó a tener más familiaridad con el idioma inglés que con el portugués, escribiendo en tal idioma sus primeros poemas. El crítico literario Harold Bloom consideró a Pessoa como «Whitman renacido»,[8]​ y lo incluyó entre los 26 mejores escritores de la civilización occidental, no solo de la literatura portuguesa sino de la inglesa también. De las cuatro obras que publicó en vida, tres son en lengua inglesa y solo una en portugués, titulada Mensagem. Pessoa tradujo varias obras del inglés al portugués (p. ej., de Shakespeare o Edgar Allan Poe), y del portugués (en particular, de António Botto y José de Almada Negreiros) al inglés y al francés. Pessoa fue un escritor prolífico, y no solo bajo su propio nombre, pues creó aproximadamente otros setenta y cinco, de los cuales destacan los de Alberto Caeiro, Alexander Search, Álvaro de Campos, Bernardo Soares y Ricardo Reis. No los llamaba pseudónimos, pues creía que esta palabra no captaba su verdadera vida intelectual independiente, y en cambio los llamó sus heterónimos. Estas figuras imaginarias a veces mostraban posturas impopulares o extremas. El poeta estadounidense Robert Hass ha dicho al respecto que: «otros modernistas como Yeats, Pound o Elliot inventaban máscaras a través de las cuales hablaban ocasionalmente... Pessoa inventaba poetas enteros». Buscó también inspiraciones en las obras de los poetas William Wordsworth, James Joyce y Walt Whitman.",
      explanation:
        "La integral de 3x² es x³ + C, aplicando la regla de integración de potencias.",
      type: "text",
    },
    answers: [
      {
        option_id: 1,
        content:
          "Fernando Pessoa nació el 13 de junio de 1888 en la capital portuguesa,[a]​ hijo de Joaquim de Seabra Pessoa, de 38 años, funcionario público del Ministerio de Justicia, y crítico musical del periódico Diário de Notícias, y natural de Lisboa",
        is_correct: false,
        type: "latex",
      },
      {
        option_id: 2,
        content:
          "Fernando Pessoa nació el 13 de junio de 1888 en la capital portuguesa,[a]​ hijo de Joaquim de Seabra Pessoa, de 38 años, funcionario público del Ministerio de Justicia, y crítico musical del periódico Diário de Notícias, y natural de Lisboa",
        is_correct: true,
        type: "latex",
      },
      {
        option_id: 3,
        content:
          "Fernando Pessoa nació el 13 de junio de 1888 en la capital portuguesa,[a]​ hijo de Joaquim de Seabra Pessoa, de 38 años, funcionario público del Ministerio de Justicia, y crítico musical del periódico Diário de Notícias, y natural de Lisboa",
        is_correct: false,
        type: "latex",
      },
      {
        option_id: 4,
        content:
          "Fernando Pessoa nació el 13 de junio de 1888 en la capital portuguesa,[a]​ hijo de Joaquim de Seabra Pessoa, de 38 años, funcionario público del Ministerio de Justicia, y crítico musical del periódico Diário de Notícias, y natural de Lisboa",
        is_correct: false,
        type: "latex",
      },
    ],
  },
  {
    question: {
      question_id: 5,
      subject: "Eliam",
      subtopic: "Álgebra lineal",
      statement: "¿Qué representa la segunda derivada de una función?",
      explanation:
        "La segunda derivada indica la concavidad de la función y los puntos de inflexión.",
      type: "text",
    },
    answers: [
      {
        option_id: 1,
        content: "La pendiente de la función",
        is_correct: false,
        type: "text",
      },
      {
        option_id: 2,
        content: "La concavidad de la función",
        is_correct: true,
        type: "text",
      },
      {
        option_id: 3,
        content: "El área bajo la curva",
        is_correct: false,
        type: "text",
      },
      {
        option_id: 4,
        content: "Los puntos críticos",
        is_correct: false,
        type: "text",
      },
    ],
  },
];

export default function Practicar() {
  const config = usePracticeParams();
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

  // Memoizar valores calculados
  const totalQuestions = useMemo(() => config.questions, [config.questions]);
  const currentQuestion = useMemo(() => mockQuestions[currentQuestionIndex], [currentQuestionIndex]);
  const progress = useMemo(() => ((currentQuestionIndex + 1) / totalQuestions) * 100, [currentQuestionIndex, totalQuestions]);
  
  // Memoizar el estado de la respuesta correcta
  const isSelectedCorrect = useMemo(() => 
    selectedOption !== null ? currentQuestion.answers[selectedOption].is_correct : false,
    [selectedOption, currentQuestion.answers]
  );

  // Función memoizada para formatear tiempo
  const getFormattedElapsedTime = useCallback((start: number) => {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  }, []);

  // Memoizar funciones de manejo de eventos
  const handleSelect = useCallback((index: number) => {
    if (!confirmed) setSelectedOption(index);
  }, [confirmed]);

  const handleConfirm = useCallback(() => {
    if (selectedOption === null) return;
    
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
      const final = getFormattedElapsedTime(Date.now());
      setTiempoFinal(final);
      setPracticeComplete(true);
    }
  }, [currentQuestionIndex, totalQuestions, getFormattedElapsedTime]);

  const handleReport = useCallback(() => {
    console.log(`Reportando pregunta ${currentQuestion.question.question_id}`);
    alert("Pregunta reportada. Gracias por tu feedback.");
  }, [currentQuestion.question.question_id]);

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

  // Memoizar textos y variantes del botón
  const buttonText = useMemo(() => {
    if (!confirmed) return "Confirmar";
    return currentQuestionIndex < totalQuestions - 1 ? "Continuar" : "Finalizar";
  }, [confirmed, currentQuestionIndex, totalQuestions]);

  const buttonVariant = useMemo(() => 
    confirmed ? (isSelectedCorrect ? "correct" : "incorrect") : "normal",
    [confirmed, isSelectedCorrect]
  );

  // Timer effect (sin cambios, ya está optimizado)
  useEffect(() => {
    if (!config.timerEnabled) return;

    const totalTimeSec = config.selectedTime * 60;
    const startTime = Date.now();

    const timeoutId = setTimeout(() => {
      const final = getFormattedElapsedTime(startTime);
      setTiempoFinal(final);
      setPracticeComplete(true);
      setTimeExpired(true);
    }, totalTimeSec * 1000);

    return () => clearTimeout(timeoutId);
  }, [config.timerEnabled, config.selectedTime, getFormattedElapsedTime]);

  if (practiceComplete) {
    return (
      <PracticeSummary
        userAnswers={userAnswers}
        totalQuestions={totalQuestions}
        totalTime={tiempoFinal}
        timeExpired={timeExpired}
        questions={mockQuestions.slice(
          0,
          Math.min(totalQuestions, mockQuestions.length)
        )}
      />
    );
  }

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
        {/* Iconos de acción - Solo se muestran después de confirmar */}
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