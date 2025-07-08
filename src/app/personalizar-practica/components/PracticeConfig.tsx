"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUESTIONS_COUNT_OPTIONS, TIME_OPTIONS } from "@/data/catalogs";
import { PracticeConfigState } from "@/hooks/usePracticeConfig";
import {
  getSubjectByName,
  getSubjectNames,
  getSubtopicsBySubjectName,
} from "@/lib/utils";
import { GameModes } from "@/types/practice";
import { useEffect } from "react";
import { MultiSelect } from "./MultiSelect";

// ⚠️ Cambia esto por la lógica de sesión cuando esté disponible
const isPremium = false;

interface PracticeConfigProps {
  config: PracticeConfigState;
  onConfigChange: (updates: Partial<PracticeConfigState>) => void;
}

export const PracticeConfig = ({
  config,
  onConfigChange,
}: PracticeConfigProps) => {
  const SUBJECT_NAMES = getSubjectNames();

  useEffect(() => {
    if (config.mode === GameModes.HARDCORE) {
      onConfigChange({ selectedQuestions: "30", timerEnabled: false });
    }
  }, [config.mode, onConfigChange]);

  return (
    <div className="bg-(--principal-secondary-color) rounded-lg border border-(--shadow) p-6">
      {/* 🔢 Número de preguntas */}
      {config.mode !== GameModes.HARDCORE && (
        <div className="mb-6">
          <label className="text-sm font-medium text-(--text) mb-2 block">
            🔢 Número de preguntas
          </label>
          <Select
            onValueChange={(e) => onConfigChange({ selectedQuestions: e })}
            value={config.selectedQuestions}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar cantidad" />
            </SelectTrigger>
            <SelectContent>
              {(config.mode === GameModes.SUBTOPIC ? ["5","10"] : QUESTIONS_COUNT_OPTIONS).map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  disabled={!isPremium && parseInt(option) > 5}
                >
                  {option} {!isPremium && parseInt(option) > 5 && "🔒"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!isPremium && (
            <p className="text-xs text-(--text) mt-2 opacity-80">
              Solo los usuarios{" "}
              <span className="text-(--blue-main)">PREMIUM</span> pueden
              seleccionar más de 5 preguntas.
            </p>
          )}
        </div>
      )}

      {/* 📙 Materias (multi-select si modo aleatorio) */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <label className="text-sm font-medium text-(--text)">
            📙 Materia
          </label>
        </div>

        {config.mode === GameModes.RANDOM ? (
          <MultiSelect
            options={SUBJECT_NAMES.map((name) => ({
              label: name,
              value: name,
            }))}
            defaultValue={config.selectedSubjects}
            onValueChange={(values) =>
              onConfigChange({ selectedSubjects: values })
            }
            placeholder="Seleccionar materias"
            className="w-full"
          />
        ) : (
          <Select
            onValueChange={(e) => onConfigChange({ selectedSubjects: [e] })}
          >
            <SelectTrigger className="w-full p-3">
              <SelectValue placeholder="Seleccionar materia" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECT_NAMES.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* 📚 Subtema */}
      {config.mode === GameModes.SUBTOPIC && (
        <div className="mb-6">
          <label className="text-sm font-medium text-(--text) mb-2 block">
            📚 Subtema
          </label>

          {(() => {
            const subject = getSubjectByName(
              config.selectedSubjects[0] === undefined
                ? ""
                : config.selectedSubjects[0]
            );
            const subtopics = subject
              ? getSubtopicsBySubjectName(subject.name)
              : [];

            return (
              <Select
                onValueChange={(e) => onConfigChange({ selectedSubtopic: e })}
                disabled={!subject}
              >
                <SelectTrigger className="w-full p-3" disabled={!subject}>
                  <SelectValue placeholder="Seleccionar subtema" />
                </SelectTrigger>
                <SelectContent>
                  {subtopics.map((option) => (
                    <SelectItem key={option.id} value={option.name}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          })()}
        </div>
      )}

      {/* ⌛ Timer */}
      {config.mode !== GameModes.HARDCORE && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-(--text)">
              ⌛ Reloj
            </label>
            <button
              onClick={() =>
                onConfigChange({ timerEnabled: !config.timerEnabled })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                config.timerEnabled
                  ? "bg-(--blue-main)"
                  : "bg-(--principal-main-color) border border-(--shadow)"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  config.timerEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <p className="text-xs text(--text) mb-3">
            Añade un poco más de presión con un timer
          </p>

          <div className={`flex gap-2`}>
            {TIME_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onConfigChange({ selectedTime: option.value })}
                disabled={!config.timerEnabled}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  config.selectedTime === option.value && config.timerEnabled
                    ? "bg-(--blue-main) text-white border-(--blue-main)"
                    : "bg-(--principal-main-color) text-(--text) border-(--shadow)"
                } ${
                  config.timerEnabled
                    ? "opacity-100 cursor-pointer hover:border-(--blue-main)"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ✍️ Mostrar justificaciones */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-(--text)">
            ✍️ Mostrar justificaciones
          </label>
          <button
            onClick={() =>
              onConfigChange({
                showJustifications: !config.showJustifications,
              })
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              config.showJustifications
                ? "bg-(--blue-main)"
                : "bg-(--principal-secondary-color) border border-(--shadow)"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white border-(--shadow) transition-transform ${
                config.showJustifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-(--text)">Aprende con cada respuesta</p>
      </div>
    </div>
  );
};
