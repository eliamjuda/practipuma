import Button from "../ui/buttonPP";


interface HeroSectionProps {
  title: string;
  highlight: string;
  description: string;
  ctaLabel: string;
  // ctaHref: string;
  visual: React.ReactNode;
}


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
          {title} <span className="span-pp">{highlight}</span>
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