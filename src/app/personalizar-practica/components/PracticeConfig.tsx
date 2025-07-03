
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QUESTIONS_COUNT_OPTIONS, TIME_OPTIONS } from "@/data/catalogs"
import { PracticeConfigState } from "@/hooks/usePracticeConfig";
import { getSubjectByName, getSubjectNames, getSubtopicsBySubjectName } from "@/lib/utils";
import { GameModes } from "@/types/practice";
import { useEffect } from "react";

interface PracticeConfigProps {
  config: PracticeConfigState;
  onConfigChange: (updates: Partial<PracticeConfigState>) => void;
}

export const PracticeConfig = ({ config, onConfigChange }: PracticeConfigProps) => {

    const SUBJECT_NAMES = getSubjectNames();

    useEffect(() => {
      console.log("me rendericé")
      if (config.mode === GameModes.HARDCORE) {
        onConfigChange({ selectedQuestions: "30", timerEnabled: false });
      }
    },[config.mode, onConfigChange]);

    return (
        <>
          {/* Configuration Card */}
          <div className="bg-(--principal-secondary-color)  rounded-lg border border-(--shadow) p-6 mb-8">


            {/* Number of Questions */}

            {
              config.mode !== GameModes.HARDCORE && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-medium text-(--text)">
                      🔢 Número de preguntas
                    </label>
                  </div>
                  <Select onValueChange={(e) => onConfigChange({ selectedQuestions: e })}>
                      <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar cantidad" />
                      </SelectTrigger>
                      <SelectContent>
                          {QUESTIONS_COUNT_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>

                </div>
              )
            }


            {/* Subject */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-medium text-(--text)">
                  📙 Materia
                </label>
              </div>
              <Select onValueChange={(e) => onConfigChange({ selectedSubject: e })}>
                  <SelectTrigger className="w-full p-3">
                      <SelectValue placeholder="Seleccionar materia" />
                  </SelectTrigger>
                  <SelectContent>
                      {SUBJECT_NAMES.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>

              {config.mode === GameModes.SUBTOPIC && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-medium text-(--text)">
                      📚 Subtema
                    </label>
                  </div>

                  {/* Obtener subtemas solo si el subject existe */}
                  {(() => {
                    const subject = getSubjectByName(config.selectedSubject);
                    const subtopics = subject ? getSubtopicsBySubjectName(subject.name) : [];

                    return (
                      <Select
                        onValueChange={(e) => onConfigChange({ selectedSubtopic: e })}
                        disabled={!subject}
                      >
                        <SelectTrigger
                          className="w-full p-3"
                          disabled={!subject}
                        >
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

            {/* Timer */}
            { config.mode !== GameModes.HARDCORE && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-(--text)">
                      ⌛ Reloj
                    </label>
                  </div>
                  <button
                    onClick={() => onConfigChange({ timerEnabled: !config.timerEnabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      config.timerEnabled ? 'bg-(--blue-main)' : 'bg-(--principal-main-color) border border-(--shadow)'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.timerEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text(--text) mb-3">
                  Añade un poco más de presión con un timer
                </p>
                
                {config.timerEnabled && (
                  <div className="flex gap-2">
                    {TIME_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => onConfigChange({ selectedTime: option.value })}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                          config.selectedTime === option.value
                            ? 'bg-(--blue-main) text-white border-(--blue-main)'
                            : 'bg-(--principal-main-color) text-(--text) border-(--shadow) hover:border-(--blue-main)'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}


            {/* Show Justifications */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-(--text)">
                    ✍️ Mostrar justificaciones
                  </label>
                </div>
                <button
                  onClick={() => onConfigChange({ showJustifications: !config.showJustifications })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    config.showJustifications ? 'bg-(--blue-main)' : 'bg-(--principal-secondary-color) border border-(--shadow)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white border-(--shadow) transition-transform ${
                      config.showJustifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-(--text)">
                Aprende con cada respuesta
              </p>
            </div>
          </div>
        </>
    )
}