import { Progress } from "@/components/ui/progress";

export default function ProgressBar() {
  return (
    <div className="md:mb-8 mb-6 md:mt-8 my-2 md:px-0 px-2">
      <div className="text-sm font-medium mb-2">6/10</div>
      <Progress value={60} className="text-(--blue-main)" />
    </div>
  );
}
