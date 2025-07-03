
export interface Subtopic {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  name: string;
  subtopics: Subtopic[];
}