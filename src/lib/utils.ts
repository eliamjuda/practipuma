import { SUBJECTS_CATALOG } from "@/data/catalogs";
import { Subject, Subtopic } from "@/types/catalogsTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectById = (id: number): Subject | undefined => {
  return SUBJECTS_CATALOG.find((subject) => subject.id === id);
};

export const getSubjectIdByName = (name: string | string[]): Subject | undefined => {
  return SUBJECTS_CATALOG.find((subject) => subject.name === name )
}

// FUNCION EXCLUSIVA PARA USE QUESTIONS
export const getSubjectsIdsByName = (name: string | string[]): number | number[] | string | undefined => {
  if (Array.isArray(name)) {
    return name
      .map(n => SUBJECTS_CATALOG.find(subject => subject.name === n)?.id)
      .filter((id): id is number => id !== undefined); // Filtra los undefined
  }
  return name;
};

export const getSubtopicIdByName = (
  subjectId: number,
  subtopicName: string
): number | undefined => {
  const subject = getSubjectById(subjectId);
  const subtopic = subject?.subtopics.find(
    (s) => s.name.toLowerCase() === subtopicName.toLowerCase()
  );
  return subtopic?.id;
};



export const getSubjectByName = (name: string): Subject | undefined => {
  return SUBJECTS_CATALOG.find(
    (subject) => subject.name.toLowerCase() === name.toLowerCase()
  );
};

export const getSubtopicById = (
  subjectId: number,
  subtopicId: number
): Subtopic | undefined => {
  const subject = getSubjectById(subjectId);
  return subject?.subtopics.find((subtopic) => subtopic.id === subtopicId);
};

export const getSubtopicsBySubjectId = (subjectId: number): Subtopic[] => {
  const subject = getSubjectById(subjectId);
  return subject?.subtopics || [];
};

export const getSubtopicsBySubjectName = (subjectName: string): Subtopic[] => {
  const subject = getSubjectByName(subjectName);
  return subject?.subtopics || [];
};

export const getAllSubjects = (): Subject[] => {
  return SUBJECTS_CATALOG;
};

export const getSubjectNames = (): string[] => {
  return SUBJECTS_CATALOG.map((subject) => subject.name);
};

export const getSubtopicNames = (subjectId: number): string[] => {
  const subject = getSubjectById(subjectId);
  return subject?.subtopics.map((subtopic) => subtopic.name) || [];
};

// Para búsquedas y filtros
export const searchSubjects = (query: string): Subject[] => {
  const lowerQuery = query.toLowerCase();
  return SUBJECTS_CATALOG.filter(
    (subject) =>
      subject.name.toLowerCase().includes(lowerQuery) ||
      subject.subtopics.some((subtopic) =>
        subtopic.name.toLowerCase().includes(lowerQuery)
      )
  );
};

export const searchSubtopics = (
  query: string
): Array<{ subject: Subject; subtopic: Subtopic }> => {
  const lowerQuery = query.toLowerCase();
  const results: Array<{ subject: Subject; subtopic: Subtopic }> = [];

  SUBJECTS_CATALOG.forEach((subject) => {
    subject.subtopics.forEach((subtopic) => {
      if (subtopic.name.toLowerCase().includes(lowerQuery)) {
        results.push({ subject, subtopic });
      }
    });
  });

  return results;
};
