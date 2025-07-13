// app/practicar-examen-simulacro/layout.tsx
import { PageTransition } from '@/components/common/PageTransitions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Examen Simulacro - PrepPolitécnico',
  description: 'Practica con un examen simulacro completo del IPN',
};

export default function ExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <PageTransition>
      <div className="min-h-screen bg-(--principal-main-color)">
        {children}
      </div>
    </PageTransition> 
  );
}