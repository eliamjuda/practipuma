"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ExamArea, AREA_NAMES } from "@/types/exam";

interface ExamHeaderProps {
  area: ExamArea;
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  onToggleNavigation: () => void;
  showNavigation: boolean;
}

export default function ExamHeader({
  area,
  currentQuestion,
  totalQuestions,
  answeredCount,
  onToggleNavigation,
  showNavigation
}: ExamHeaderProps) {
  const [elapsedTime, setElapsedTime] = useState("0h 0m 00s");

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const mins = Math.floor((elapsed % 3600) / 60);
      const secs = elapsed % 60;
      setElapsedTime(`${hours}h ${mins}m ${secs < 10 ? "0" : ""}${secs}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-(--principal-secondary-color) border-b-2 border-(--shadow) px-4 py-4  flex-shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-evenly">
        {/* Logo y botón cerrar */}
        <div className="flex items-center gap-5 md:gap-20">
          <Link href="/dashboard" className="text-(--text) hover:text-(--shadow-hover)">
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
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </Link>
          
          
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-(--text)">
              Examen Simulacro
            </h1>
            <p className="text-sm text-gray-500 hidden md:block">
              {AREA_NAMES[area]}
            </p>
          </div>
        </div>

        {/* Info central */}
        <div className="flex items-center gap-6">
          {/* Progreso */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-(--text)">
              Pregunta {currentQuestion} de {totalQuestions}
            </span>
            <div className="w-32 h-2 bg-(--principal-main-color) rounded-full overflow-hidden">
              <div 
                className="h-full bg-(--blue-main) transition-all duration-300"
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Respondidas */}
          <div className="text-center hidden md:block">
            <div className="text-lg font-bold text-(--blue-main)">
              {answeredCount}
            </div>
            <div className="text-xs text-gray-500">
              Respondidas
            </div>
          </div>

          {/* Tiempo */}
          <div className="text-center">
            <span className="bg-blue-400 rounded-2xl px-2 text-xs md:text-sm font-bold text-white">
              {elapsedTime}
            </span>
          </div>
        </div>

        {/* Botón navegación */}
        <button
          onClick={onToggleNavigation}
          className={`p-2 rounded-lg cursor-pointer border transition-colors ${
            showNavigation 
              ? 'bg-(--blue-main) text-white border-(--blue-main)' 
              : 'bg-(--principal-main-color) text-(--text) border-(--shadow) hover:bg-(--shadow)'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>
      </div>

      {/* Progreso móvil */}
      <div className="md:hidden mt-3 flex items-center justify-between">
        <span className="text-sm text-(--text)">
          {currentQuestion}/{totalQuestions}
        </span>
        <div className="flex-1 mx-4 h-2 bg-(--principal-main-color) rounded-full overflow-hidden">
          <div 
            className="h-full bg-(--blue-main) transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
        <span className="text-sm text-(--text)">
          {Math.round((currentQuestion / totalQuestions) * 100)}%
        </span>
      </div>
    </div>
  );
}