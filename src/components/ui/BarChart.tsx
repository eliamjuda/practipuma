import { useEffect, useState } from "react";

interface BarChartProps {
  total: number;
  correct: number;
  incorrect: number;
}

export default function BarChart({ total, correct, incorrect }: BarChartProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Aseguramos un mínimo para buena escala visual
  const yMax = Math.max(Math.ceil(total / 5) * 5, total);

  // Crear 7 etiquetas uniformemente distribuidas
  const steps = 6;
  const yLabels = Array.from({ length: steps + 1 }, (_, i) =>
    Math.round((yMax / steps) * (steps - i))
  );

  const getHeight = (value: number) => `${(value / yMax) * 100}%`;

  return (
    <div className="w-full">
      <div className="flex w-full h-64 max-w-xl mx-auto mb-4">
        {/* Eje Y */}
        <div className="flex flex-col justify-between text-sm text-zinc-400 mr-2">
          {yLabels.map((n, index) => (
            <div
              key={index}
              className="h-[calc(100%/6)] flex items-center justify-end pr-1"
            >
              {n}
            </div>
          ))}
        </div>
        {/* Gráfica */}
        <div className="flex-1 flex items-end justify-evenly border-l border-zinc-600 relative">
          {/* Líneas guías horizontales */}
          {[...Array(steps)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 w-full border-t border-dashed border-zinc-700"
              style={{ bottom: `${(i / steps) * 100}%` }}
            />
          ))}
          {/* Barra Aciertos */}
          <div className="flex flex-col items-center h-full justify-end">
            <div
              className="bg-(--green-main) border-1 border-(--green-secondary) w-20 rounded transition-all duration-1000 origin-bottom"
              style={{ height: animate ? getHeight(correct) : "0%" }}
            ></div>
            {/* <p className="mt-2 text-sm">Aciertos</p> */}
          </div>
          {/* Barra Errores */}
          <div className="flex flex-col items-center h-full justify-end">
            <div
              className="bg-(--red-main) border-1 border-(--red-secondary) w-20 rounded transition-all duration-1000 delay-150 origin-bottom"
              style={{ height: animate ? getHeight(incorrect) : "0%" }}
            ></div>
            {/* <p className="mt-2 text-sm">Errores</p> */}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-evenly text-(--text) pl-6">
        <p>Aciertos</p>
        <p>Errores</p>
      </div>
    </div>
  );
}
