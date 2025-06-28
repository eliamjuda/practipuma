'use client';

import React, { useState } from 'react';
import { PracticeModeCard } from './components/PracticeModeCard';
import { PracticeCard } from './components/PracticeCard';
import Button from '@/components/ui/button';
import Image from 'next/image';

const PracticeDashboard = () => {
  const [isPremium, setIsPremium] = useState(false);

  const practiceData = [
    {
      id: 1,
      title: "Reforzamiento",
      subtitle: "Tienes dificultades al escribir bajo en matemáticas, repasémelo",
      subject: "Matemáticas",
      priority: "Prioridad alta",
      color: "bg-orange-500",
      completed: false
    },
    {
      id: 2,
      title: "Mindfulness",
      subtitle: "¿Cómo sufrir menos? Una ráfaga de dos días para practicar la historia universal",
      subject: "Historia universal",
      priority: "Urgente",
      color: "bg-purple-600",
      completed: false
    },
    {
      id: 3,
      title: "Revisión",
      subtitle: "Ya es hora de que volvamos a practicar Biología",
      priority: "Urgente",
      subject: "Biología",
      color: "bg-green-600",
      completed: true
    }
  ];

  const practiceModesData: PracticeModeCardProps[] = [
    {
      id: 1,
      title: "¡Más recientes recientes!",
      subtitle: "¡Practica con las últimas preguntas agregadas!",
      color: "bg-purple-600",
      image: "/images/illustrations/practica-1.svg",
      badge: "2025",
      premium: true
    },
    {
      id: 2,
      title: "Examen simulacro",
      subtitle: "Practica un examen muy parecido al que harás, sin miedo al éxito.",
      color: "bg-purple-800",
      image: "/images/illustrations/practica-2.svg",
      badge: null,
      premium: false
    },
    {
      id: 3,
      title: "Materia",
      subtitle: "Practica con una materia de tu elección y domínala 🔥",
      color: "bg-cyan-500",
      image: "/images/illustrations/practica-3.svg",
      badge: null,
      premium: false
    },
    {
      id: 4,
      title: "Subtema",
      subtitle: "¿Nos vamos más específico 🎯? Va ",
      image: "/images/illustrations/practica-4.svg",
      color: "bg-pink-400",
      badge: null,
      premium: true
    },
    {
      id: 5,
      title: "Aleatorio",
      subtitle: "Selecciona las materias a practicar y saldrán preguntas aleatorias 🔀",
      color: "bg-teal-600",
      image: "/images/illustrations/practica-5.svg",
      badge: null,
      premium: true
    },
    {
      id: 6,
      title: "Hardcore",
      subtitle: "Como en el minecraft, vidas limitadas, ¡no te equivoques!",
      color: "bg-red-500",
      image: "/images/illustrations/practica-6.svg",
      badge: null,
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-(--principal-main-color) mt-12 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="mb-2">Hola, <span className="font-semibold">Eliam</span></p>
              <h1 className="text-2xl md:text-3xl font-bold">¡Comencemos a practicar! 😎</h1>
            </div>
            
            {/* Premium Toggle (for demo purposes) */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPremium(!isPremium)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isPremium ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isPremium ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm">Premium</span>
            </div>
          </div>
        </div>

        {/* Unrestricted Practice Section */}
        {!isPremium && (
            <div className="mb-8">
            <div className="flex items-center bg-gradient-to-b from-(--premium-color-2) to-(--premium-color-1) text-white p-8 rounded-4xl shadow-lg w-full">
                <div className='flex-1 flex-col content-center text-center md:text-left'>
                    <h2 className="text-xl font-semibold mb-2">Practica sin restricciones</h2>
                    <p className="mb-4">¡Psst, psst! y todo por menos de lo que cuesta un café ☕</p>
                    <div className='flex justify-center md:justify-start'>
                        <Button variant={"premium"}>Mejorar plan</Button>
                    </div>
                </div>
                <div className="hidden md:flex items-center justify-center w-[30%] flex-shrink-0">
                    <Image 
                        src={"/images/illustrations/candado-pp.png"} 
                        width={200} 
                        height={200} 
                        alt='PractiPuma es barato'
                        className="object-contain"
                    />
                </div>
            </div>
            </div>
        )}

        <div className='flex flex-col'>
            {/* Practice Modes Grid */}
            <div className={`mb-8 mt-24 ${isPremium ? 'order-2' : ''}`}>
              <h2 className="text-xl font-semibold mb-4">
                Modos de <span>práctica</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {practiceModesData.map((mode) => (
                  <PracticeModeCard isPremium={isPremium} key={mode.id} mode={mode} />
                ))}
              </div>
            </div>
            {/* Custom Practice Section */}
            <div className="mb-8 mt-24">
              <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-xl font-semibold">
                  Practica a <span>tu medida</span>
                </h2>
                {!isPremium && (
                  <p className="bg-[linear-gradient(322deg,_rgba(4,59,147,1)_0%,_rgba(7,11,85,1)_60%)] text-white px-2 py-1 text-xs font-bold rounded">
                    PREMIUM
                  </p>
                )}
              </div>

                { isPremium && <p className='block mt-2 mb-4 font-medium'>Retos diarios especialmente para tí basados en tu rendimiento</p>}
            
              {isPremium ? (
                <div className="space-y-4">
                  {practiceData.map((item) => (
                    <PracticeCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className=" rounded-lg py-8 px-24 border border-(--shadow)">
                  <p className="text-center mb-4">
                    Aquí aparecerán tus sesiones de práctica personalizadas, basadas en tu rendimiento, dificultades, o para más fácil:
                    <span className="font-semibold"> enfocadas 100% en tí</span>
                  </p>
                  <p className="text-center">
                    <button className="text-(--blue-main) hover:text-(--blue-secondary) font-bold underline text-sm cursor-pointer">
                      DESBLOQUEAR ESTA SECCIÓN
                    </button>
                  </p>
                </div>
              )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default PracticeDashboard;