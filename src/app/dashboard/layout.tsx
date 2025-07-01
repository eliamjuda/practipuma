import Footer from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { PageTransition } from "@/components/common/PageTransitions";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Header />
      <PageTransition>
        <main className="">
          {children}
        </main>
      </PageTransition>
      <Footer/>
    </div>
  );
}
