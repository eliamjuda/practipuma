export type PracticeModeProps = {
    id: number;
    mode: string;
    title: string;
    description: string;
    premium: boolean;
    badge: string | null;
}

export type GameModes = "recent" | "exam" | "hardcore" | "subject" | "recent" | "subtopic";

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
} as const;

export type GameMode = typeof GameModes[keyof typeof GameModes];

