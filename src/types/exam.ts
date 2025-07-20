// types/exam.ts

export type ExamArea = 'area1' | 'area2' | 'area3' | 'area4';

export interface ExamAnswer {
  option_id: number;
  content: string;
  is_correct: boolean;
  type: "text" | "image";
}

export interface ExamQuestion {
  question_id: number;
  subject: string;
  area: ExamArea;
  statement: string;
  explanation: string;
  type: "text" | "image";
  answers: ExamAnswer[];
}

// Tipos específicos para la API de simulacros
export interface SimulacroAPIQuestion {
  position: number;
  question: {
    question_id: number;
    subject: string;
    subtopic: string;
    statement: string;
    explanation: string;
    type: string;
  };
  answers: Array<{
    option_id: number;
    content: string;
    is_correct: boolean;
    type: string;
  }>;
}

export interface SimulacroAPIResponse {
  simulacro: {
    area: string;
    total_questions: number;
    questions: SimulacroAPIQuestion[];
  };
  distribution: {
    expected: Record<string, number>;
    obtained: Record<string, number>;
  };
  metadata: {
    generated_at: string;
    area: string;
    total_questions: number;
  };
}

// Tipos para estadísticas del examen
export interface ExamStats {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  scorePercentage: number;
  timeSpent: string;
  subjectStats: SubjectStat[];
}

export interface SubjectStat {
  subject: string;
  total: number;
  correct: number;
  percentage: number;
}

// Configuración del examen
export interface ExamConfig {
  area: ExamArea;
  mode: 'simulacro';
  timeLimit?: number; // en minutos, opcional
}

// Estados de carga
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Props para componentes
export interface ExamHeaderProps {
  area: ExamArea;
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  onToggleNavigation: () => void;
  showNavigation: boolean;
}

export interface ExamNavigationProps {
  questions: ExamQuestion[];
  userAnswers: Map<number, number>;
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  isVisible: boolean;
  onClose: () => void;
}

export interface ExamQuestionCardProps {
  question: ExamQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
}

export interface ExamSummaryProps {
  questions: ExamQuestion[];
  userAnswers: Map<number, number>;
  totalTime: string | null;
  area: ExamArea;
  distribution?: SimulacroAPIResponse['distribution'];
  metadata?: SimulacroAPIResponse['metadata'];
}

// Error types
export interface ExamError {
  code: string;
  message: string;
}

export const AREA_NAMES: Record<ExamArea, string> = {
  area1: 'Área 1 - Ciencias Físico-Matemáticas',
  area2: 'Área 2 - Ciencias Biológicas y de la Salud', 
  area3: 'Área 3 - Ciencias Sociales',
  area4: 'Área 4 - Humanidades y Artes'
} as const;

// Area configurations
export const AREA_CONFIGS = {
  area1: {
    name: 'Área 1 - Ciencias Físico-Matemáticas',
    subjects: ['Matemáticas', 'Física', 'Química', 'Biología', 'Español', 'Literatura', 'Geografía', 'Historia universal', 'Historia de México'],
    distribution: {
      'Matemáticas': 26,
      'Física': 16,
      'Química': 10,
      'Biología': 10,
      'Español': 18,
      'Literatura': 10,
      'Geografía': 10,
      'Historia universal': 10,
      'Historia de México': 10
    }
  },
  area2: {
    name: 'Área 2 - Ciencias Biológicas y de la Salud',
    subjects: ['Matemáticas', 'Física', 'Química', 'Biología', 'Español', 'Literatura', 'Geografía', 'Historia universal', 'Historia de México'],
    distribution: {
      'Matemáticas': 24,
      'Física': 12,
      'Química': 13,
      'Biología': 13,
      'Español': 18,
      'Literatura': 10,
      'Geografía': 10,
      'Historia universal': 10,
      'Historia de México': 10
    }
  },
  area3: {
    name: 'Área 3 - Ciencias Sociales',
    subjects: ['Matemáticas', 'Física', 'Química', 'Biología', 'Español', 'Literatura', 'Geografía', 'Historia universal', 'Historia de México'],
    distribution: {
      'Matemáticas': 24,
      'Física': 10,
      'Química': 10,
      'Biología': 10,
      'Español': 18,
      'Literatura': 10,
      'Geografía': 10,
      'Historia universal': 14,
      'Historia de México': 14
    }
  },
  area4: {
    name: 'Área 4 - Humanidades y Artes',
    subjects: ['Matemáticas', 'Física', 'Química', 'Biología', 'Español', 'Literatura', 'Geografía', 'Historia universal', 'Historia de México', 'Filosofía'],
    distribution: {
      'Matemáticas': 22,
      'Física': 10,
      'Química': 10,
      'Biología': 10,
      'Español': 18,
      'Literatura': 10,
      'Geografía': 10,
      'Historia universal': 10,
      'Historia de México': 10,
      'Filosofía': 10
    }
  }
} as const;