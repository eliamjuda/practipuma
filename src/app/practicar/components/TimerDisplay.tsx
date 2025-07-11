// components/TimerDisplay.tsx
"use client";
import { useEffect, useState, memo } from "react";

interface TimerDisplayProps {
  /** Tiempo inicial en segundos */
  totalTime: number;
  /** Callback opcional cuando el temporizador llega a 0 */
  onExpire?: () => void;
}

const TimerDisplay = memo(function TimerDisplay({
  totalTime,
  onExpire,
}: TimerDisplayProps) {
  const [remaining, setRemaining] = useState(totalTime);

  useEffect(() => {
    if (totalTime <= 0) return;

    // Reiniciamos el contador en cada cambio de totalTime
    setRemaining(totalTime);

    const id = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(id);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [totalTime, onExpire]);

  const mins = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");


  return (
    <span className="flex justify-center items-center text-sm leading-none">
      {mins}:{secs}
    </span>
  );
});

export default TimerDisplay;
