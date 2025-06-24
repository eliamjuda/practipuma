
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