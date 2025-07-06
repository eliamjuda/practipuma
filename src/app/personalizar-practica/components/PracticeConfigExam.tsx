import Link from "next/link";
import { useState } from "react";

interface ExamConfigState {
  selectedArea: ExamAreaId;
}

type ExamAreaId = '' | 'area1' | 'area2' | 'area3' | 'area4';


interface PracticeConfigExamProps {
  setExamAreaSelected: React.Dispatch<React.SetStateAction<"" | ExamAreaId>>;
}

export const PracticeConfigExam = ({ setExamAreaSelected }: PracticeConfigExamProps ) => {
  const isPremium = false; // ⚠️ cambiar a true si el usuario es premium

  const [config, setConfig] = useState<ExamConfigState>({
    selectedArea: '',
  });

  const areas: {id: ExamAreaId; name: string; icon: string; description: string}[] = [
    {
      id: "area1",
      name: "Área 1",
      icon: "📐",
      description: "Ciencias Físico-Matemáticas y de las Ingenierías",
    },
    {
      id: "area2",
      name: "Área 2",
      icon: "🧪",
      description: "Ciencias Biológicas y de la Salud",
    },
    {
      id: "area3",
      name: "Área 3",
      icon: "🏛️",
      description: "Ciencias Sociales",
    },
    {
      id: "area4",
      name: "Área 4",
      icon: "🎨",
      description: "Artes y Humanidades",
    },
  ];

  const premiumAllowedAreas = ["area2", "area4"];

  const handleAreaSelect = (areaId: 'area1' | 'area2' | 'area3' | 'area4' | '') => {
    const isAllowed = isPremium || premiumAllowedAreas.includes(areaId);
    if (isAllowed) {
      setConfig({ selectedArea: areaId });
      setExamAreaSelected(areaId)
    }
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

      <div className="grid grid-cols-1 gap-4">
        {areas.map((area) => {
          const isDisabled = !isPremium && !premiumAllowedAreas.includes(area.id);
          const isSelected = config.selectedArea === area.id;
          const baseColor = isSelected
            ? "bg-(--blue-main) border-blue-500"
            : "bg-(--principal-main-color) ";

          return (
            <button
              key={area.id}
              onClick={() => handleAreaSelect(area.id )}
              className={`px-6 py-2 rounded-lg border-2 border-(--shadow) transition-all duration-200 text-left ${
                baseColor
              } ${isDisabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:border-blue-400"}`}
              disabled={isDisabled}
            >
              <div className="flex items-center gap-4">
                <div className="text-1xl">{area.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-(--text) text-m">
                    {area.name}{ isDisabled ? " 🔒" : "" }
                  </h4>
                  <p className="text-sm text-(--text) opacity-70 md:block hidden">
                    {area.description}
                  </p>
                </div>
                <div
                  className={`text-(--text) ml-2 ${
                    isSelected ? "visible" : "invisible"
                  }`}
                >
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
          );
        })}
      </div>
        
        {
            !isPremium && (
        <Link href={"/pricing"}>

                      <div
        className={`md:mt-6 md:p-4 md:bg-(--principal-main-color) transition-all rounded-lg md:border md:border-(--shadow) hover:border-(--blue-main)`}
      >
        <div className="flex flex-col items-center gap-2 justify-center">
            <span className="text-xs/tight md:block hidden">¿De verdad todavía no eres PREMIUM? 😢</span> 
          <p className="text-sm text-(--text) font-medium text-center md:mt-0 mt-2">
            Desbloquea todas las áreas y simulacros nuevos con <span className="text-(--blue-main)">PREMIUM</span>
          </p>
        </div>

      </div>
      </Link>

            ) 
        }

    </div>
  );
};
