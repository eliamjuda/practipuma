import { Check } from "lucide-react";
import { useState } from "react";

interface ExamConfigState {
  selectedArea: string | null;
}

export const PracticeConfigExam = () => {
  const [config, setConfig] = useState<ExamConfigState>({
    selectedArea: null,
  });

  const areas = [
    {
      id: "area1",
      name: "Área 1",
      icon: "📐",
      description: "Ciencias Físico-Matemáticas y de las Ingenierías",
      color: "bg-(--principal-main-color) hover:border-blue-400",
      selectedColor: "bg-(--blue-main) border-blue-500",
    },
    {
      id: "area2", 
      name: "Área 2",
      icon: "🧪",
      description: "Ciencias Biológicas y de la Salud",
      color: "bg-(--principal-main-color) hover:border-blue-400",
      selectedColor: "bg-(--blue-main) border-blue-500",
    },
    {
      id: "area3",
      name: "Área 3", 
      icon: "🏛️",
      description: "Ciencias Sociales",
      color: "bg-(--principal-main-color) hover:border-blue-400",
      selectedColor: "bg-(--blue-main) border-blue-500",
    },
    {
      id: "area4",
      name: "Área 4",
      icon: "🎨",
      description: "Artes y Humanidades",
      color: "bg-(--principal-main-color) hover:border-blue-400",
      selectedColor: "bg-(--blue-main) border-blue-500",
    },
  ];

  const handleAreaSelect = (areaId: string) => {
    setConfig({ selectedArea: areaId });
  };

  return (
    <div className="bg-(--principal-secondary-color) rounded-lg border border-(--shadow) p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-(--text) mb-2">
          Selecciona tu examen
        </h3>
        <p className="text-sm text-(--text) opacity-80">
          Elige el área que quieres practicar para tu examen
        </p>
      </div>

      <div className="grid grid-cols-1  gap-4">
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => handleAreaSelect(area.id)}
            className={`px-6 py-2 cursor-pointer rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
              config.selectedArea === area.id
                ? area.selectedColor
                : area.color
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-1xl">{area.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-(--text) text-m">
                  {area.name}
                </h4>
                <p className="text-sm text-(--text) opacity-70 md:block hidden">
                  {area.description}
                </p>
              </div>
                <div className={`text-(--text) ml-2 ${config.selectedArea === area.id ? "visible" : "invisible"}`}>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              
            </div>
          </button>
        ))}
      </div>

        <div className={`mt-6 p-4 bg-(--principal-main-color) rounded-lg border border-(--shadow) ${config.selectedArea ? 'visible': 'invisible'}`}>
          <div className="flex items-center gap-2">
            <span className="text-green-500"><Check /></span>
            <p className="text-sm text-(--text) font-medium">
              {areas.find(area => area.id === config.selectedArea)?.name} seleccionada
            </p>
          </div>
        </div>
    </div>
  );
};