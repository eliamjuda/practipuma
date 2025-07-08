import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
  lives?: number;
}

export default function ProgressBar({ current, total, progress, lives }: ProgressBarProps) {
  return (
    <div className="md:mb-8 mb-6 md:mt-8 my-2 md:px-0 px-2">
      <div className={`flex items-center mb-2 ${lives ? 'justify-center' : 'justify-between'}`}>
        <div className={`${lives ? 'hidden' : 'block'} text-sm font-medium`}>
          {current}/{total}
        </div>

        {lives !== undefined && (
          <div className="flex gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className="text-xl md:text-3xl">
                {i < lives ? "❤️" : "🤍"}
              </span>
            ))}
          </div>
        )}
      </div>

      <Progress value={progress} className={`${lives ? 'hidden' : 'block'} text-(--blue-main)`} />
    </div>
  );
}

