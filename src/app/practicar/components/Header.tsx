"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface HeaderProps {
  subject?: string;
  subtopic?: string;
  showTimer?: boolean;
  totalTime?: number; // en segundos}
}

export default function Header({ subject, subtopic, showTimer, totalTime = 0 }: HeaderProps) {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (!showTimer || totalTime <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimer, totalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="relative w-screen bg-(--principal-secondary-color) border border-b-2 border-(--shadow) md:px-4 px-0 py-6 flex justify-center items-center mb-2 flex-shrink-0">
      <Link href="/dashboard" className="cursor-pointer absolute md:left-20 left-5">
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
          className="text-(--text)"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </Link>

      <div className="flex flex-row md:items-center gap-1 md:gap-2 text-center justify-center items-center">
        <div className="text-lg font-bold md:ml-0 ml-6 leading-none">{subject}</div>
        { subject && <div className="hidden md:block mx-1 w-[4px] h-[4px] bg-(--text) rounded-full" />}
        <div className="text-[1rem]/tight mx-1 leading-none truncate max-w-[100px]">{subtopic}</div>

        {showTimer && (
          <div className="ml-2 bg-blue-100 flex items-center justify-center text-blue-600 font-semibold px-2 py-1 rounded-full">
            <span className="text-sm flex justify-center items-center leading-none"><svg  xmlns="http://www.w3.org/2000/svg"  width={15}  height={15}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="mr-0.5 icon icon-tabler icons-tabler-outline icon-tabler-alarm"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M12 10l0 3l2 0" /><path d="M7 4l-2.75 2" /><path d="M17 4l2.75 2" /></svg> {formatTime(timeLeft)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
