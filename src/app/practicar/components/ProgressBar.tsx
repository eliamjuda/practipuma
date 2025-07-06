import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export default function ProgressBar({ current, total, progress }: ProgressBarProps) {
  return (
    <div className="md:mb-8 mb-6 md:mt-8 my-2 md:px-0 px-2">
      <div className="text-sm font-medium mb-2">{current}/{total}</div>
      <Progress value={progress} className="text-(--blue-main)" />
    </div>
  );
}