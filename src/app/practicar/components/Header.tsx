// components/Header.tsx
"use client";
import Link from "next/link";
import TimerDisplay from "./TimerDisplay";

interface HeaderProps {
  subject?: string;
  subtopic?: string;
  showTimer?: boolean;
  /** Tiempo total en segundos */
  totalTime?: number;
  /** Callback cuando el temporizador expira */
  onTimerExpire?: () => void;
}

export default function Header({
  subject,
  subtopic,
  showTimer = false,
  totalTime = 0,
  onTimerExpire,
}: HeaderProps) {
  return (
    <div className="relative w-screen bg-(--principal-secondary-color) border-b-2 border-(--shadow) md:px-4 px-0 py-6 flex justify-center items-center mb-2 flex-shrink-0">
      <Link href="/dashboard" className="absolute md:left-20 left-5">
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

      <div className="flex flex-row items-center gap-2 text-center justify-center">
        {subject && (
          <>
            <div className="text-lg font-bold leading-none truncate md:ml-0 ml-5">
              {subject}
            </div>
            <div className="hidden md:block mx-1 w-[4px] h-[4px] bg-(--text) rounded-full" />
          </>
        )}
        {subtopic && (
          <div className="text-[1rem]/tight mx-1 leading-none truncate max-w-[100px]">
            {subtopic}
          </div>
        )}

        {showTimer && totalTime > 0 && (
          <div className="ml-2 bg-blue-100 flex items-center justify-center text-blue-600 font-semibold px-2 py-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              height={15}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M12 10l0 3l2 0" />
              <path d="M7 4l-2.75 2" />
              <path d="M17 4l2.75 2" />
            </svg>
            <TimerDisplay
              totalTime={totalTime}
              onExpire={onTimerExpire}
            />
          </div>
        )}
      </div>
    </div>
  );
}
