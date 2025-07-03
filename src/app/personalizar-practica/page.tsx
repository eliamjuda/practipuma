'use client'

import Button from '@/components/ui/button';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PracticeInfo } from './components/PracticeInfo';
import { GameModes } from '@/types/practice';
import { PracticeConfig } from './components/PracticeConfig';
import { usePracticeConfig } from '@/hooks/usePracticeConfig';

const PracticeConfigInterface = () => {
  const params = useSearchParams();
  const mode = params.get('mode') as GameModes;
  const { config, updateConfig } = usePracticeConfig(mode);

  console.log(config)

  return (
      <div className="h-[100dvh] relative w-[100%] max-w-[100%] p-4 md:p-0 md:w-auto flex items-center justify-center">
        <div className="md:max-w-2xl w-[100%] mx-auto md:mb-0 mb-12">
          <div className="flex items-center mb-6">
            <Link href={"/dashboard"}>
              <button className="cursor-pointer flex items-center transition-colors text-(--text)">
                <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
                <p className='mx-2 font-medium'>Configurar práctica</p>
              </button>
            </Link>
          </div>

          <PracticeInfo mode={mode} />

          <PracticeConfig  
            config={config}
            onConfigChange={updateConfig}
          />

        </div>
        {/* Start Button */}
        <div className='bg-(--principal-secondary-color) absolute bottom-0 w-[100%] border-t border-(--shadow) h-[100px] flex justify-center items-center right-0'>
            <Button>
                Comenzar a practicar
            </Button>
        </div>
      </div>
  );
};

export default PracticeConfigInterface;

