import { PageTransition } from "@/components/common/PageTransitions";
import { Suspense } from "react";

export default function PracticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <PageTransition>
        <Suspense fallback={<div>Cargando...</div>}>
            <main className="">
            {children}
            </main>
      </Suspense>
    </PageTransition>
    </div>
  );
}
