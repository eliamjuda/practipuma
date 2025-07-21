// hooks/useExamParams.ts
import { useSearchParams } from 'next/navigation';
import { ExamArea, ExamConfig } from '@/types/exam';

export function useExamParams(): ExamConfig {
  const searchParams = useSearchParams();
  
  // Obtener el área desde los parámetros de búsqueda
  const areaParam = searchParams.get('area');
  const area: ExamArea = areaParam && ['1', '2', '3', '4'].includes(areaParam) 
    ? `area${parseInt(areaParam)}` as ExamArea 
    : `area${1}`; 

  // Tiempo límite opcional (en minutos)
  const timeLimitParam = searchParams.get('timeLimit');
  const timeLimit = timeLimitParam ? parseInt(timeLimitParam) : undefined;

  const mode = 'simulacro'

  return {
    area,
    timeLimit,
    mode,
  };
}