export type PracticeModeProps = {
    id: number;
    mode: string;
    title: string;
    description: string;
    premium: boolean;
    badge: string | null;
}

export type GameModes = "recent" | "exam" | "hardcore" | "subject" | "recent" | "subtopic" | "random";

export type PracticeModeCardProps = {
    mode: PracticeModeProps;
    isPremium: boolean;
}

export type PracticeCardProps = {
    item : {
        id: number,
        title: string,
        subtitle: string,
        priority: string,
        subject: string,
        color: string,
        completed: boolean
    }
}

export const GameModes = {
  RECENT: 'recent',
  EXAM: 'exam',
  HARDCORE: 'hardcore',
  SUBJECT: 'subject',
  SUBTOPIC: 'subtopic',
  RANDOM: 'random'
} as const;

export type GameMode = typeof GameModes[keyof typeof GameModes];

export type Question = {
    question_id: number;
    subject: string;
    subtopic: string;
    statement: string;
    explanation: string;
    type: 'text' | 'latext';
}

export type Answer = {
    option_id: number;
    content: string;
    is_correct: boolean;
    type: 'text' | 'latex';
}

export type PracticeQuestion = {
    question: Question;
    answers: Answer[];
}