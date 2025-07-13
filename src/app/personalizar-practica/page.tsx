"use client";

import Button from "@/components/ui/buttonPP";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PracticeInfo } from "./components/PracticeInfo";
import { GameModes } from "@/types/practice";
import { PracticeConfig } from "./components/PracticeConfig";
import { usePracticeConfig } from "@/hooks/usePracticeConfig";
import { PracticeConfigExam } from "./components/PracticeConfigExam";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ExamAreaId = 'area1' | 'area2' | 'area3' | 'area4';

const PracticeConfigInterface = () => {
  const params = useSearchParams();
  const mode = params.get("mode") as GameModes;
  const { config, updateConfig } = usePracticeConfig(mode);
  const [examAreaSelected, setExamAreaSelected] = useState<ExamAreaId | ''>('');

  const isConfigValid = () => {
    const { selectedQuestions, selectedSubjects, selectedSubtopic } = config;
    const hasSubject = selectedSubjects.length > 0;
    const hasQuestions = !!selectedQuestions;
    const hasSubtopic = !!selectedSubtopic;
    const hasSelectedArea = !!examAreaSelected;

    switch (mode) {
      case GameModes.HARDCORE:
        return hasSubject;
      case GameModes.RANDOM:
        return hasSubject && hasQuestions;
      case GameModes.SUBTOPIC:
        return hasSubject && hasQuestions && hasSubtopic;
      case GameModes.EXAM:
        return hasSelectedArea;
      default:
        return hasSubject && hasQuestions;
    }
  };

  const router = useRouter();

  // Función helper para convertir area ID a número
  const getAreaNumber = (areaId: ExamAreaId): number => {
    const mapping: Record<ExamAreaId, number> = {
      'area1': 1,
      'area2': 2, 
      'area3': 3,
      'area4': 4
    };
    return mapping[areaId];
  };

  const handleStart = () => {
    if (!isConfigValid()) return;

    // Si es modo EXAM, navegar al examen simulacro
    if (mode === GameModes.EXAM) {
      const areaNumber = getAreaNumber(examAreaSelected as ExamAreaId);
      router.push(`/practicar-examen-simulacro?area=${areaNumber}`);
      return;
    }

    // Para otros modos, usar la lógica existente
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("subject", config.selectedSubjects[0] || "");
    params.set("questions", config.selectedQuestions || "5");
    params.set("timer", config.timerEnabled ? "true" : "false");
    params.set("time", config.selectedTime || "0");
    params.set("justify", config.showJustifications ? "true" : "false");

    if (mode === GameModes.SUBTOPIC) {
      params.set("subtopic", config.selectedSubtopic || "");
    }

    router.push(`/practicar?${params.toString()}`);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col w-full justify-center">
      {/* Contenido principal scrollable */}
      <div className="flex-1 overflow-y-auto px-4 md:px-0 md:flex md:justify-center mt-8 md:mt-0 content-center items-center md:pb-0 pb-[50px]">
        <div className="w-full md:max-w-2xl mt-4">
          <div className="flex items-center mb-6">
            <Link href={"/dashboard"}>
              <button className="cursor-pointer flex items-center transition-colors text-(--text)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                  <path d="M5 12l4 4" />
                  <path d="M5 12l4 -4" />
                </svg>
                <p className="mx-2 font-medium">Configurar práctica</p>
              </button>
            </Link>
          </div>

          <PracticeInfo mode={mode} />

          {mode === GameModes.EXAM ? (
            <PracticeConfigExam setExamAreaSelected={setExamAreaSelected} />
          ) : (
            <PracticeConfig config={config} onConfigChange={updateConfig} />
          )}
        </div>
      </div>

      {/* Botón de comenzar (sticky) */}
      <div className="bg-(--principal-secondary-color) sticky bottom-0 w-full border-t border-(--shadow) h-[100px] flex justify-center items-center z-10">
        <Button
          disabled={!isConfigValid()}
          onClick={handleStart}
          className={`${
            !isConfigValid() ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {mode === GameModes.EXAM ? "Comenzar examen" : "Comenzar a practicar"}
        </Button>
      </div>
    </div>
  );
};

export default PracticeConfigInterface;