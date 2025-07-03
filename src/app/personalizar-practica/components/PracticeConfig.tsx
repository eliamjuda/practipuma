
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QUESTIONS_COUNT_OPTIONS, TIME_OPTIONS } from "@/data/catalogs"
import { getSubjectNames } from "@/lib/utils";

type PracticeConfigProps = {
    setSelectedQuestions: (value: string) => void; 
    setSelectedSubject: (value: string) => void;
    setTimerEnabled: (value: boolean) => void;
    setSelectedTime: (value: string) => void;
    setShowJustifications: (value: boolean) => void;
    showJustifications: boolean;
    selectedTime: string;
    timerEnabled: boolean;
}

export const PracticeConfig = ({ setSelectedQuestions, setSelectedSubject, setTimerEnabled, setSelectedTime, setShowJustifications, selectedTime, showJustifications, timerEnabled }: PracticeConfigProps) => {

    const SUBJECT_NAMES = getSubjectNames();

    return (
        <>


          {/* Configuration Card */}
          <div className="bg-(--principal-secondary-color)  rounded-lg border border-(--shadow) p-6 mb-8">
            {/* Number of Questions */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-medium text-(--text)">
                  🔢 Número de preguntas
                </label>
              </div>
              <Select onValueChange={(e) => setSelectedQuestions(e)}>
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

            {/* Subject */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-medium text-(--text)">
                  📙 Materia
                </label>
              </div>
              <Select onValueChange={(e) => setSelectedSubject(e)}>
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

            {/* Subject */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-medium text-(--text)">
                  📚 Subtema
                </label>
              </div>
              <Select onValueChange={(e) => setSelectedSubject(e)}>
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

            {/* Timer */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-(--text)">
                    ⌛ Reloj
                  </label>
                </div>
                <button
                  onClick={() => setTimerEnabled(!timerEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    timerEnabled ? 'bg-(--blue-main)' : 'bg-(--principal-main-color) border border-(--shadow)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      timerEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text(--text) mb-3">
                Añade un poco más de presión con un timer
              </p>
              
              {timerEnabled && (
                <div className="flex gap-2">
                  {TIME_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedTime(option.value)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                        selectedTime === option.value
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

            {/* Show Justifications */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-(--text)">
                    ✍️ Mostrar justificaciones
                  </label>
                </div>
                <button
                  onClick={() => setShowJustifications(!showJustifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    showJustifications ? 'bg-(--blue-main)' : 'bg-(--principal-secondary-color) border border-(--shadow)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white border-(--shadow) transition-transform ${
                      showJustifications ? 'translate-x-6' : 'translate-x-1'
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