// types/exam.ts

export type ExamArea = 1 | 2 | 3 | 4;

export interface ExamAnswer {
  option_id: number;
  content: string;
  is_correct: boolean;
  type: "text" | "latex";
}

export interface ExamQuestion {
  question_id: number;
  subject: string;
  area: ExamArea;
  statement: string;
  explanation: string;
  type: "text" | "latex";
  answers: ExamAnswer[];
}

export interface ExamConfig {
  area: ExamArea;
  timeLimit?: number; // en minutos, opcional
}

export interface ExamResult {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  subject: string;
}

export interface SubjectStats {
  subject: string;
  total: number;
  correct: number;
  percentage: number;
}

export const AREA_NAMES: Record<ExamArea, string> = {
  1: "Área 1 - Físico-Matemáticas",
  2: "Área 2 - Ciencias Biológicas y de la Salud", 
  3: "Área 3 - Ciencias Sociales",
  4: "Área 4 - Humanidades y Artes"
};

export const AREA_COLORS: Record<ExamArea, string> = {
  1: "bg-blue-100 text-blue-800",
  2: "bg-green-100 text-green-800", 
  3: "bg-purple-100 text-purple-800",
  4: "bg-orange-100 text-orange-800"
};