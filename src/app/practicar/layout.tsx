import { Loader } from "@/components/common/Loading";
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
        <Suspense
            fallback={<Loader/>}>
            <main className="w-[100vw] max-w-[100vw]">
                {children}
            </main>
      </Suspense>
    </PageTransition>
    </div>
  );
}
