"use client";
import { useSearchParams } from "next/navigation";
import { GameModes } from "@/types/practice";
import { getSubjectIdByName, getSubtopicIdByName } from "@/lib/utils";

export interface PracticeConfigFromURL {
  mode: GameModes;
  subjects: string[];
  questions: number;
  timerEnabled: boolean;
  selectedTime: number;
  showJustifications: boolean;
  subtopicId?: number | null;
  subjectId: number;        // ID real de la materia para la BD
}

export function usePracticeParams(): PracticeConfigFromURL {
  const params = useSearchParams();

  const mode = params.get("mode") ?? "subject";
  const subject = params.get("subject") ?? "";
  
  const subjects = subject.includes("-") ? subject.split("-") : [subject];
  
  const subjectId = subjects.length > 0 ? getSubjectIdByName(subjects[0])?.id || 0 : 0;
  
  const questions = parseInt(params.get("questions") ?? "5");
  const timerEnabled = params.get("timer") === "true";
  const selectedTime = parseInt(params.get("time") ?? "0");
  const showJustifications = params.get("justify") === "true";
  
  const subtopicParam = params.get("subtopic");
  const subtopicId = subtopicParam && subjectId 
    ? getSubtopicIdByName(subjectId, subtopicParam) 
    : null;

  return {
    mode: mode as GameModes,
    subjects,
    subjectId,
    questions,
    timerEnabled,
    selectedTime,
    showJustifications,
    subtopicId,
  };
}