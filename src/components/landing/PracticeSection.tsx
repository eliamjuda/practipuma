'use client';

import { useState } from "react";
import Button from "../ui/button";
import Image from "next/image";

interface PracticeCard {
  id: string;
  title: string;
  color: string;
  buttonText: string;
  imageUrl: string;
}

interface PracticeSectionProps {
  cards: Omit<PracticeCard, 'onPractice'>[];
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  cards,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlides = Math.ceil(cards.length / 3);

  // Definir la lógica de práctica aquí
  const handlePractice = (cardId: string, cardTitle: string) => {
    console.log(`Practicar: ${cardTitle}`);
    // Tu lógica aquí - navegar, abrir modal, etc.
    
    // Ejemplos:
    switch(cardId) {
      case '1':
        // Navegar a página de práctica por materia
        break;
      case '2':
        // Navegar a página de exámenes
        break;
      case '3':
        // Navegar a página de subtemas
        break;
    }
  };

  return (
    <section className="mb-24">
      <div className="container mx-auto md:px-10">
        <div className="flex flex-col">
          {/* Tarjetas con navegación */}
          <div className="flex-1">
            <div className="flex items-center justify-center gap-4 mb-8 md:justify-end">
              <button 
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="p-2 cursor-pointer w-[50px] rounded-[10px] border-2 border-(--shadow) hover:bg-(--shadow) disabled:opacity-50 transition-all duration-300"
              >
                ←
              </button>
              <p className="text-(--text)">{currentSlide + 1}/{maxSlides}</p>
              <button 
                onClick={() => setCurrentSlide(Math.min(maxSlides - 1, currentSlide + 1))}
                disabled={currentSlide === maxSlides - 1}
                className="p-2 cursor-pointer w-[50px] rounded-[10px] border-2 border-(--shadow) hover:bg-gray-700 disabled:opacity-50 transition-all duration-300"
              >
                →
              </button>
            </div>

            {/* Container con overflow hidden para el efecto de transición */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Crear slides agrupando las tarjetas de 3 en 3 */}
                {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      {cards.slice(slideIndex * 3, (slideIndex * 3) + 3).map((card, cardIndex) => (
                        <div 
                          key={card.id} 
                          className="bg-(--principal-secondary-color) rounded-lg p-4 border-(--shadow) border-2 text-center transform transition-all duration-300"
                          style={{ 
                            animationDelay: `${cardIndex * 100}ms` 
                          }}
                        >
                          <div className="relative w-full h-32 rounded-lg mb-4 overflow-hidden">
                            <Image 
                              src={card.imageUrl} 
                              alt={card.title} 
                              className="w-full h-full object-cover transition-transform duration-300"
                              width={400}
                              height={200}
                            />
                            <div 
                              className="absolute inset-0 transition-opacity duration-300"
                              style={{ backgroundColor: card.color, opacity: 0.5 }}
                            />
                          </div>
                          <h3 className="text-(--text) text-lg font-semibold mb-4 transition-colors duration-300">
                            {card.title}
                          </h3>
                          <Button 
                            className="w-full" 
                            onClick={() => handlePractice(card.id, card.title)}
                          >
                            {card.buttonText}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};