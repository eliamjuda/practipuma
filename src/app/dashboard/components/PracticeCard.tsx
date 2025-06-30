import { PracticeCardProps } from "@/types/dashboard";
import Link from "next/link";

export const PracticeCard = ({ item }: PracticeCardProps) => {

  return (
    <Link href={`/personalizar-practica`} className="block">
      <div className={`bg-(--principal-secondary-color) rounded-lg md:p-1 p-2 border border-(--shadow) flex items-center justify-between cursor-pointer`}>
        <div className="flex items-center space-x-4">
          {/* Div de imagen con mismo tamaño que PracticeModeCard pero escalado */}
          <div 
              className="md:w-20 md:h-20 w-[80px] h-[80px] rounded-lg relative overflow-hidden border-2 border-(--shadow)"
              style={{
                backgroundColor: item.color.replace('bg-', '').replace('-500', '').replace('-600', '').replace('-800', ''), // Extraer color base
                opacity: 10,
              }}
            >
            {/* Icono principal */}
              <div 
                className="absolute inset-0 opacity-80"
                style={{
                  backgroundImage: `url(${'/images/illustrations/practica-1.svg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            
          </div>
          
          <div className="flex-1 md:pr-6 pr-1">
              <h3 className="font-semibold flex items-center">{item.title} 
                  <svg className="ml-1 mr-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_167_10)">
                          <path d="M16 18C16.5304 18 17.0391 18.2107 17.4142 18.5858C17.7893 18.9609 18 19.4696 18 20C18 19.4696 18.2107 18.9609 18.5858 18.5858C18.9609 18.2107 19.4696 18 20 18C19.4696 18 18.9609 17.7893 18.5858 17.4142C18.2107 17.0391 18 16.5304 18 16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18ZM16 6C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8C18 7.46957 18.2107 6.96086 18.5858 6.58579C18.9609 6.21071 19.4696 6 20 6C19.4696 6 18.9609 5.78929 18.5858 5.41421C18.2107 5.03914 18 4.53043 18 4C18 4.53043 17.7893 5.03914 17.4142 5.41421C17.0391 5.78929 16.5304 6 16 6ZM9 18C9 16.4087 9.63214 14.8826 10.7574 13.7574C11.8826 12.6321 13.4087 12 15 12C13.4087 12 11.8826 11.3679 10.7574 10.2426C9.63214 9.11742 9 7.5913 9 6C9 7.5913 8.36786 9.11742 7.24264 10.2426C6.11742 11.3679 4.5913 12 3 12C4.5913 12 6.11742 12.6321 7.24264 13.7574C8.36786 14.8826 9 16.4087 9 18Z" stroke="#1367F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                          <clipPath id="clip0_167_10">
                              <rect width="24" height="24" fill="white"/>
                          </clipPath>
                      </defs>
                  </svg>
                  { item.completed &&
                      <p className="text-xs bg-(--green-main) flex items-center justify-center border border-(--green-secondary) px-1 py-0.5 rounded-full" >Completado
                          <svg className="ml-1" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.50009 0.669946C8.25423 1.10537 8.88158 1.73021 9.32002 2.4826C9.75847 3.23498 9.9928 4.08883 9.99984 4.95962C10.0069 5.8304 9.78636 6.68792 9.36013 7.44729C8.93389 8.20667 8.31672 8.84155 7.56971 9.2891C6.8227 9.73666 5.97176 9.98136 5.10111 9.99898C4.23047 10.0166 3.37032 9.80653 2.60581 9.38957C1.8413 8.9726 1.19895 8.36321 0.742342 7.6217C0.285735 6.8802 0.030705 6.0323 0.00250009 5.16195L0 4.99995L0.00250009 4.83794C0.030502 3.97444 0.281777 3.13293 0.731829 2.39544C1.18188 1.65796 1.81535 1.04967 2.57048 0.629887C3.32561 0.210103 4.17662 -0.00685539 5.04057 0.000165123C5.90451 0.00718564 6.75189 0.237945 7.50009 0.669946ZM6.85358 3.64645C6.76749 3.56036 6.65294 3.50864 6.53142 3.501C6.40991 3.49336 6.28978 3.53032 6.19358 3.60495L6.14658 3.64645L4.50006 5.29245L3.85355 4.64645L3.80655 4.60495C3.71034 4.53037 3.59023 4.49346 3.46875 4.50112C3.34726 4.50879 3.23274 4.5605 3.14667 4.64658C3.0606 4.73265 3.00888 4.84716 3.00121 4.96865C2.99355 5.09013 3.03046 5.21024 3.10504 5.30645L3.14654 5.35345L4.14655 6.35345L4.19355 6.39495C4.28124 6.46298 4.38907 6.4999 4.50006 6.4999C4.61104 6.4999 4.71887 6.46298 4.80656 6.39495L4.85356 6.35345L6.85358 4.35345L6.89509 4.30645C6.96971 4.21024 7.00667 4.09012 6.99903 3.96861C6.99139 3.84709 6.93967 3.73254 6.85358 3.64645Z" fill="#078F07"/>
                          </svg>
                      </p>
                  }
              </h3>
            <p className="mb-2 md:mb-0 text-sm">{item.subtitle}</p>
            <div className="flex space-x-2">
                <p
                  className={`px-2 py-1 text-xs rounded-full font-medium border-(--shadow) border`}>
                  {item.subject}
                </p>
                <p
                  className={`px-2 py-1 text-xs rounded-full font-medium bg-(--red-main) border-(--red-secondary) border`}>
                  {item.priority}
                </p>

            </div>
          </div>
        </div>
        
        <div className="text-gray-400 w-[50px] flex-shrink-0 flex justify-center">
          { item.completed ? (
              <div className="bg-(--green-secondary)  text-white w-6 h-6 rounded-full flex items-center justify-center">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
              </div>
          ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg> 
              )
          }
        </div>
      </div>
    </Link>
  );
};