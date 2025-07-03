import { Subject } from "@/types/catalogsTypes";

export const QUESTIONS_COUNT_OPTIONS = ["5", "10", "15", "20", "25", "30"]

export const TIME_OPTIONS = [
    { label: '5 min', value: "5" },
    { label: '10 min', value: "10" },
    { label: '15 min', value: "15" },
    { label: '30 min', value: "30" },
];


export const SUBJECTS_CATALOG: Subject[] = [
  {
    id: 1,
    name: "Matemáticas",
    subtopics: [
      { id: 8, name: "Operaciones con números reales, complejos y expresiones algebraicas" },
      { id: 9, name: "Productos notables y factorización" },
      { id: 10, name: "Ecuaciones" },
      { id: 11, name: "Desigualdades" },
      { id: 12, name: "Sistemas de Ecuaciones" },
      { id: 13, name: "Funciones algebraicas" },
      { id: 14, name: "Trigonometría" },
      { id: 15, name: "Funciones exponenciales y logarítmicas" },
      { id: 16, name: "Recta" },
      { id: 17, name: "Circunferencia" },
      { id: 18, name: "Parábola" },
      { id: 19, name: "Elipse" },
      { id: 20, name: "Hipérbola" },
      { id: 21, name: "Ecuación general de segundo grado" },
      { id: 22, name: "Límites" },
      { id: 23, name: "La derivada" },
      { id: 24, name: "La integral" }
    ]
  },
  {
    id: 2,
    name: "Física",
    subtopics: [
      { id: 25, name: "Cinemática" },
      { id: 26, name: "Fuerzas, leyes de Newton y Ley de la Gravitación Universal" },
      { id: 27, name: "Trabajo y leyes de la conservación" },
      { id: 28, name: "Termodinámica" },
      { id: 29, name: "Ondas" },
      { id: 30, name: "Electromagnetismo" },
      { id: 31, name: "Fluidos" },
      { id: 32, name: "Óptica" },
      { id: 33, name: "Física contemporánea" }
    ]
  },
  {
    id: 3,
    name: "Química",
    subtopics: [
      { id: 34, name: "Temas básicos" },
      { id: 35, name: "Agua" },
      { id: 36, name: "Aire" },
      { id: 37, name: "Alimentos" },
      { id: 38, name: "La energía y las reacciones químicas" }
    ]
  },
  {
    id: 4,
    name: "Biología",
    subtopics: [
      { id: 39, name: "Célula" },
      { id: 40, name: "Metabolismo celular" },
      { id: 41, name: "Reproducción" },
      { id: 42, name: "Mecanismo de la herencia" },
      { id: 43, name: "Evolución" },
      { id: 44, name: "Los seres vivos y su ambiente" }
    ]
  },
  {
    id: 5,
    name: "Español",
    subtopics: [
      { id: 1, name: "Funciones de la lengua" },
      { id: 2, name: "Formas del discurso" },
      { id: 3, name: "Comprensión de lectura" },
      { id: 4, name: "Gramática" },
      { id: 5, name: "Redacción" },
      { id: 6, name: "Vocabulario" },
      { id: 7, name: "Ortografía" }
    ]
  },
  {
    id: 6,
    name: "Literatura",
    subtopics: [
      { id: 45, name: "El texto" },
      { id: 46, name: "Géneros y corrientes literarias" },
      { id: 47, name: "Redacción y técnicas de investigación documental" }
    ]
  },
  {
    id: 7,
    name: "Geografía",
    subtopics: [
      { id: 48, name: "Tierra, base del desarrollo del hombre" },
      { id: 49, name: "Geografía humana: el paisaje cultural (espacio geográfico)" }
    ]
  },
  {
    id: 8,
    name: "Historia universal",
    subtopics: [
      { id: 50, name: "La historia" },
      { id: 51, name: "Las revoluciones burguesas" },
      { id: 52, name: "Pensamiento y movimientos sociales y políticos del siglo XIX" },
      { id: 53, name: "El imperialismo" },
      { id: 54, name: "La Primera Guerra Mundial" },
      { id: 55, name: "El mundo entre guerras" },
      { id: 56, name: "La Segunda Guerra Mundial" },
      { id: 57, name: "El conflicto entre el capitalismo y el socialismo" },
      { id: 58, name: "El mundo actual" }
    ]
  },
  {
    id: 9,
    name: "Historia de México",
    subtopics: [
      { id: 59, name: "La Nueva España (siglos XVI a XIX)" },
      { id: 60, name: "El movimiento de Independencia de la Nueva España (1810 - 1821)" },
      { id: 61, name: "México independiente (1821 - 1854)" },
      { id: 62, name: "La Reforma liberal y la resistencia de la República (1854 - 1876)" },
      { id: 63, name: "El Porfiriato (1876 - 1911)" },
      { id: 64, name: "La Revolución Mexicana (1910 - 1920)" },
      { id: 65, name: "La reconstrucción nacional (1920 - 1940)" },
      { id: 66, name: "México contemporáneo (1940 - 2000)" }
    ]
  },
  {
    id: 10,
    name: "Filosofía",
    subtopics: [
      { id: 67, name: "Lógica" },
      { id: 68, name: "Ética" },
      { id: 69, name: "Disciplinas y problemas de la Filosofía" }
    ]
  }
];

// Constantes para fácil acceso
export const SUBJECT_IDS = {
  MATEMATICAS: 1,
  FISICA: 2,
  QUIMICA: 3,
  BIOLOGIA: 4,
  ESPANOL: 5,
  LITERATURA: 6,
  GEOGRAFIA: 7,
  HISTORIA_UNIVERSAL: 8,
  HISTORIA_MEXICO: 9,
  FILOSOFIA: 10
} as const;

// Mapeo para iconos (opcional)
export const SUBJECT_ICONS = {
  [SUBJECT_IDS.MATEMATICAS]: "🔢",
  [SUBJECT_IDS.FISICA]: "⚛️",
  [SUBJECT_IDS.QUIMICA]: "🧪", 
  [SUBJECT_IDS.BIOLOGIA]: "🧬",
  [SUBJECT_IDS.ESPANOL]: "📝",
  [SUBJECT_IDS.LITERATURA]: "📚",
  [SUBJECT_IDS.GEOGRAFIA]: "🌍",
  [SUBJECT_IDS.HISTORIA_UNIVERSAL]: "🏛️",
  [SUBJECT_IDS.HISTORIA_MEXICO]: "🇲🇽",
  [SUBJECT_IDS.FILOSOFIA]: "💭"
} as const;