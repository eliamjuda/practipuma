import { FeatureSection } from "@/components/landing/FeatureSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsBanner } from "@/components/landing/StatsBanner";
import Image from "next/image";

const numberOfQuestions = 1500; // Example value, replace with actual data


export default function LandingPage() {
  return (
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
            width={400}
            height={400}
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
            width={400}
            height={400}
            className=""
            />
          }
        reverse
      />

    </main>
  );
}
