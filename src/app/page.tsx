import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
    <section className="w-full rounded-xl mb-40 bg-(--blue-main) md:px-8 md:py-6 flex flex-wrap justify-around text-center text-white font-bold">
      {stats.map((stat, idx) => (
        <div key={idx} className="m-4 p-10">
          <p className="text-2xl md:text-4xl">{stat.value}</p>
          <p className="text-sm md:text-base font-normal">{stat.label}</p>
        </div>
      ))}
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
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-20">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold">
          {title} <span>{highlight}</span>
        </h1>
        <p className="mt-4 max-w-md">{description}</p>
        <Link href="#">
          <Button className="mt-6">
            {ctaLabel}
          </Button>
        </Link>
      </div>

      <div className="flex-1 p-[50px]">{visual}</div>
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
      <div className={`flex-1 ${reverse ? "order-2 md:order-1" : "order-2"}`}>
        <h2 className="text-4xl md:text-5xl font-bold">
          {title} <span>{highlight}</span>
        </h2>
        <p className="mt-4 max-w-lg">
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
    <main className="px-16 md:px-[20%]">
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
            width={300}
            height={300}
            className="w-full h-auto"
          />
        }
      />

      <StatsBanner
        stats={[
          { value: "+1500", label: "preguntas" },
          { value: "69", label: "subtemas" },
          { value: "+5", label: "modos de práctica" },
          { value: "+2000", label: "usuarios al mes" },
        ]}
      />

      <FeatureSection
        title="¡Practica con más de"
        highlight="1200 preguntas!"
        description="PractiPuma te ofrece una experiencia de práctica inspirada en los temas, nivel y estilo del examen de admisión de la UNAM."
        visual={
          <Image
            src="/images/illustrations/gatito-escritorio-humano.png"
            alt="¡Practica con más de 1200 preguntas!"
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
