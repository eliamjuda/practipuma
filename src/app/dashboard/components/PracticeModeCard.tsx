import { PracticeModeProps } from "@/types/dashboard";

export const PracticeModeCard = ({ isPremium, mode }: PracticeModeProps) => {
  const isLocked = mode.premium && !isPremium;
  
  return (
    <div className={`bg-(--principal-secondary-color) cursor-pointer relative flex rounded-lg p-1 border border-(--shadow)`}>
      {mode.premium && !isPremium && (
        <p className={`px-4 py-2 text-xs rounded absolute right-0 top-[-10px] bg-[linear-gradient(322deg,_rgba(4,59,147,1)_0%,_rgba(7,11,85,1)_60%)] font-bold text-white`}>
          {"PREMIUM"}
        </p>
      )}
      
      <div className={`flex items-center w-full ${isLocked ? 'opacity-60' : ''}`}>
        <div className="flex items-center space-x-3 flex-1">
          {/* Div con imagen y filtro de color */}
          <div 
            className="w-20 h-20 rounded-lg relative overflow-hidden border-2 border-(--shadow)"
            style={{
              backgroundColor: mode.color.replace('bg-', '').replace('-500', '').replace('-600', '').replace('-800', ''), // Extraer color base
              opacity: 10,
            }}
          >
            {/* Imagen de fondo */}
            <div 
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage: `url(${mode.image || '/images/illustrations/practica-1.svg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Overlay de color */}
            <div 
              className={`absolute inset-0 ${mode.color} opacity-60 mix-blend-multiply`}
            />
          </div>
          
          <div className="flex-1 pr-6">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{mode.title}</h3>
              {mode.badge && (
                <p className="bg-(--blue-main) text-white font-medium text-xs rounded-full px-2 py-0.5">{mode.badge}</p>
              )}
            </div>
            <p className="text-sm">{mode.subtitle}</p>
          </div>
        </div>
        <div className="text-gray-400 w-[30px] flex-shrink-0 flex justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};