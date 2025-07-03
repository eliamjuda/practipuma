import { GameModes } from '@/types/practice';
import { useCallback, useState } from 'react';

export interface PracticeConfigState {
    mode: GameModes;    
    selectedQuestions: string;
    selectedSubject: string;
    selectedSubtopic?: string;
    timerEnabled: boolean;
    selectedTime: string;
    showJustifications: boolean;
}

export const usePracticeConfig = (initialMode: GameModes) => {
  const [config, setConfig] = useState<PracticeConfigState>({
    mode: initialMode,
    selectedQuestions: '',
    selectedSubject: '',
    timerEnabled: true,
    selectedTime: '5',
    showJustifications: true,
  });

  const updateConfig = useCallback((updates: Partial<PracticeConfigState>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  return { config, updateConfig };
};
