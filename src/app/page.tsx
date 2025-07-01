import Footer from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { PageTransition } from "@/components/common/PageTransitions";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PracticeSection } from "@/components/landing/PracticeSection";
import { StartPracticing } from "@/components/landing/StartPracticing";
import { StatsBanner } from "@/components/landing/StatsBanner";
import Image from "next/image";

const numberOfQuestions = 1347; // Example value, replace with actual data

const practiceCards = [
  {
    id: '1',
    title: 'Estudia por materia',
    color: '#FBBF24',
    buttonText: 'Practicar',
    imageUrl: '/images/illustrations/practica-1.svg'
  },
  {
    id: '2',
    title: 'Estudia con exámenes',
    color: '#06B6D4',
    buttonText: 'Practicar',
    imageUrl: '/images/illustrations/practica-2.svg'
  },
  {
    id: '3',
    title: 'Estudia por subtemas',
    color: '#7b2ae8',
    buttonText: 'Practicar',
    imageUrl: '/images/illustrations/practica-3.svg'
  },
  {
    id: '4',
    title: 'Estudia las últimas preguntas',
    color: '#27f424',
    buttonText: 'Practicar',
    imageUrl: '/images/illustrations/practica-4.svg'
  },
  {
    id: '5',
    title: 'Modo de práctica Hardcore',
    color: '#de0b48',
    buttonText: 'Practicar',
    imageUrl: '/images/illustrations/practica-5.svg'
  },
  {
    id: '6',
    title: 'Modo de práctica nose',
    color: '#f9ae0d',
    buttonText: 'Practicar',
    imageUrl: '/images/illustrations/practica-6.svg'
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Header/>
      <PageTransition>
        <main className="px-12 md:px-[20%]">
          <HeroSection
            title="Tu pase a la UNAM comienza"
            highlight="aquí"
            description="Haz del examen un trámite más. Domínalo con nuestra fórmula y el resto será solo celebrar tu ingreso."
            ctaLabel="Comenzar a practicar"
            // ctaHref="/practice"
            visual={
              <Image
                src="/images/illustrations/happyface.png"
                alt="Aspirante seleccionado"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            }
          />
          <StatsBanner
            stats={[
              { value: `${numberOfQuestions}`, label: "preguntas" },
              { value: "69", label: "subtemas" },
              { value: "+5", label: "modos de práctica" },
              { value: "+2000", label: "usuarios al mes" },
            ]}
          />
          <FeatureSection
            title="¡Practica con más de"
            highlight={`${numberOfQuestions} preguntas!`}
            description="PractiPuma te ofrece una experiencia de práctica inspirada en los temas, nivel y estilo del examen de admisión de la UNAM."
            visual={
              <Image
                src="/images/illustrations/gatito-escritorio-humano.png"
                alt={`¡Practica con más de ${numberOfQuestions} preguntas!` }
                width={350}
                height={350}
                className=""
              />
            }
          />
          <FeatureSection
            title="Practica que se adapta"
            highlight="a tí"
            description="Cada aspirante es único. Por eso, nuestra plataforma te ofrece un plan de estudio adaptado a tus necesidades y ritmo."
            visual={
              <Image
                src="/images/illustrations/candado-pp.png"
                alt="Plan de estudio personalizado"
                width={350}
                height={350}
                className=""
                />
              }
            reverse
          />
          <FeatureSection
            title="Potencia tu preparación con "
            highlight={`modos de práctica`}
            description=""
            visual={
              <Image
                src="/images/illustrations/gatito-escritorio-humano.png"
                alt={`¡Practica con más de ${numberOfQuestions} preguntas!` }
                width={350}
                height={350}
                className=""
              />
            }
          />
          <PracticeSection cards={practiceCards} />
          <StartPracticing
        
            text="Comienza a practicar sin límites por menos de lo que cuesta un café"
            visual={
              <Image
                src="/images/illustrations/candado-pp.png"
                alt="Gatito feliz practicando"
                width={300}
                height={300}
                className=""
              />
            }
          />
        </main>
      <Footer/>
      </PageTransition>
    </div>
  );
}
