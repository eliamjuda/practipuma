
interface Stat {
  value: string;
  label: string;
}

interface StatsBannerProps {
  stats: Stat[];
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ stats }) => {
  return (
    <section className="w-full rounded-xl md:p-7 mb-20 md:mb-40 bg-(--blue-main) text-white font-bold overflow-hidden">
      {/* ... (tu código existente) */}
    </section>
  );
};