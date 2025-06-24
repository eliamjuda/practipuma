
interface FeatureSectionProps {
  title: string;
  highlight: string;
  description: string;
  visual: React.ReactNode;
  reverse?: boolean;
}

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