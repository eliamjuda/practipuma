// hooks/usePracticeConfigFromURL.ts
"use client";
import { useSearchParams } from "next/navigation";

export interface PracticeConfigFromURL {
  mode: string;
  subject: string;
  questions: number;
  timerEnabled: boolean;
  selectedTime: number;
  showJustifications: boolean;
  subtopic?: string | null;
}

export function usePracticeParams(): PracticeConfigFromURL {
  const params = useSearchParams();

  const mode = params.get("mode") ?? "subject";
  const subject = params.get("subject") ?? "";
  const questions = parseInt(params.get("questions") ?? "5");
  const timerEnabled = params.get("timer") === "true";
  const selectedTime = parseInt(params.get("time") ?? "0");
  const showJustifications = params.get("justify") === "true";
  const subtopic = params.get("subtopic");

  return {
    mode,
    subject,
    questions,
    timerEnabled,
    selectedTime,
    showJustifications,
    subtopic,
  };
}
