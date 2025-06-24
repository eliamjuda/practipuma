import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const numberOfQuestions = 1500; // Example value, replace with actual data

interface FeatureSectionProps {
  title: string;
  highlight: string;
  description: string;
  visual: React.ReactNode;
  reverse?: boolean;
}

interface HeroSectionProps {
  title: string;
  highlight: string;
  description: string;
  ctaLabel: string;
  // ctaHref: string;
  visual: React.ReactNode;
}

type Stat = {
  value: string;
  label: string;
};

interface StatsBannerProps {
  stats: Stat[];
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ stats }) => {
  return (
    <section className="w-full rounded-xl md:p-7 mb-20 md:mb-40 bg-(--blue-main) text-white font-bold overflow-hidden">
      {/* Mobile: Grid 2x2 */}
      <div className="grid grid-cols-2 md:hidden">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`p-6 text-center border-r border-b border-(--blue-main) last:border-r-0 ${
              idx >= 2 ? 'border-b-0' : ''
            } ${idx % 2 === 1 ? 'border-r-0' : ''}`}
          >
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs font-normal opacity-90 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Desktop: Flex horizontal */}
      <div className="hidden md:flex justify-around py-6 px-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <p className="text-4xl font-bold mb-2">{stat.value}</p>
            <p className="text-base font-normal opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  highlight,
  description,
  ctaLabel,
  // ctaHref,
  visual,
}) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between md:gap-8 py-20">
      {/* Contenido de texto */}
      <div className="flex-1 order-2 md:order-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold">
          {title} <span>{highlight}</span>
        </h1>
        <p className="mt-4 max-w-md mx-auto md:mx-0">{description}</p>
          <div className="mt-2 flex justify-center md:justify-start">
            <Button className="mt-6">
              {ctaLabel}
            </Button>
          </div>
      </div>

      <div className="flex-1 order-1 md:order-2 w-full flex justify-center">
        <div className="w-full max-w-[280px] md:max-w-none">
          {visual}
        </div>
      </div>
    </section>
  );
};

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  highlight,
  description,
  visual,
  reverse = false,
}) => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 justify-between py-16 mb-12">
      <div className={`flex-1 ${reverse ? "order-2 md:order-1" : "order-2"} text-center md:text-left`}>
        <h2 className="text-4xl md:text-5xl font-bold">
          {title} <span>{highlight}</span>
        </h2>
        <p className="mt-4 max-w-lg md:mr-10">
          {description}
        </p>
      </div>

      <div className={`flex-1 ${reverse ? "order-1 md:order-2" : "order-1"}`}>
        {visual} 
      </div>
    </section>
  );
};

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
