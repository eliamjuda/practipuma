import { practiceModeDecoration, practiceModesData } from "@/data/practiceModes";
import { GameModes } from "@/types/practice";
import Image from "next/image";

type PracticeInfoProps = {
    mode: GameModes;
}

export const PracticeInfo = ({ mode }: PracticeInfoProps) => {

    const practiceModeName = practiceModesData.find((modeData) => modeData.mode === mode)?.title
    const practiceModeDescription = practiceModesData.find((modeData) => modeData.mode === mode)?.description
    const practiceModeImage = practiceModeDecoration[mode as keyof typeof practiceModeDecoration]?.image;
    const practiceModeColor = practiceModeDecoration[mode as keyof typeof practiceModeDecoration]?.color;

    return (
        <div className="bg-(--principal-secondary-color) rounded-lg border border-(--shadow) p-4 md:p-2 mb-6">
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block md:h-[80px] md:w-[80px] rounded-lg p-3 flex-shrink-0 overflow-hidden">
                <div className={`absolute inset-0 opacity-30`} style={{ backgroundColor: practiceModeColor}}/>
                <div className="relative z-10 flex items-center justify-center h-full w-full">
                    <Image src={`${practiceModeImage}`} width={300} height={300} alt='Imagen de la materia' />
                </div>
                </div>
                <div>
                <h2 className="text-xl font-semibol">
                    {practiceModeName}
                </h2>
                <p className="text-sm leading-relaxed">
                    {practiceModeDescription}
                </p>
                </div>
            </div>
        </div>
    )         
}