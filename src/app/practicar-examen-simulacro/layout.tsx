// app/practicar-examen-simulacro/layout.tsx
import { Loader } from "@/components/common/Loading";
import { PageTransition } from "@/components/common/PageTransitions";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Examen Simulacro - PractiPuma",
  description:
    "Practica con un examen simulacro completo del examen de admisión de la UNAM",
};

export default function ExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition>
      <Suspense fallback={<Loader />}>
        <div className="min-h-screen bg-(--principal-main-color)">
          {children}
        </div>
      </Suspense>
    </PageTransition>
  );
}
