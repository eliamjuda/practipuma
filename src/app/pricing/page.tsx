'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import Button from '@/components/ui/buttonPP';

export default function PricingPage() {
  const premiumFeatures = [
    "Practica sin límites hasta con 50 preguntas por materia",
    "Aprendizaje personalizado",
    "Exámenes simulacro ilimitados",
    "Práctica con las preguntas más recientes",
    "Practica con subtemas",
    "Modo de práctica hardcore", 
    "Modo de práctica aleatorio",
    "Justificación de respuestas",

  ];

  const freeFeatures = [
    "Máximo 10 preguntas por materia",
    "Dos examenes simulacro disponibles",
    "Justificación de respuestas",
  ];

  const freeNotIncluded = [
    "Modo de práctica hardcore",
    "Modo de práctica aleatorio", 
    "Práctica con últimas preguntas",
    "Exámenes simulacro variados"
  ];

  const faqData = [
    {
      question: "¿Puedo cancelar en cualquier momento?",
      answer: "Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil de usuario."
    },
    {
      question: "¿Se renueva automáticamente?",
      answer: "Sí, se renueva cada mes, pero puedes cancelarlo en cualquier momento."
    },
    {
      question: "¿Con cuántos dispositivos puedo acceder?",
      answer: "Puedes acceder hasta con dos dispositivos."
    },
    {
      question: "¿Cuál fue la principal actividad económica de la Nueva España?",
      answer: "La minería. (Ok, ok, esta no es una pregunta frecuente, pero es una pregunta que podría venir en tu examen 😅)."
    }
  ];

  return (
    <>
      <div className="bg-[var(--principal-main-color)] mt-8 py-12 px-4 text-center">
        <div className="w-20 h-20 bg-gradient-to-b from-[rgba(4,59,147,1)] to-[rgba(7,11,85,1)] border-1 border-(--blue-main) rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
          PP
        </div>
        
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 text-[var(--text)]">
          Practica como crack. Pasa como crack.
        </h1>
        
        <p className="text-base md:text-lg lg:text-md text-[var(--text)] opacity-80 max-w-2xl mx-auto leading-relaxed">
          Este texto debería sonar motivador... pero mejor pruébalo y que tú avance lo diga todo
        </p>
      </div>

      <div className="py-8 px-4 flex justify-center gap-6 flex-wrap max-w-7xl mx-auto">
        {/* Free Plan */}
        <div className="bg-[var(--principal-secondary-color)] border-2 border-[var(--shadow)] rounded-2xl p-8 w-full max-w-sm min-w-[280px] relative shadow-[var(--shadow)]">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2 text-[var(--text)]">
              Plan Gratuito
            </h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-[var(--blue-main)]">
                $0
              </span>
              <span className="text-base text-[var(--text)] opacity-70">
                /siempre
              </span>
            </div>
          </div>

            <div className='w-full flex items-center justify-center mb-8'>
            <Button 
            >
               Ir Practicar
            </Button>
          </div>

          <ul className="list-none p-0 m-0 mb-6">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 mb-3 text-sm text-[var(--text)]">
                <Check size={16} className="text-[var(--green-secondary)] flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <ul className="list-none p-0 m-0">
            {freeNotIncluded.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 mb-3 text-sm text-[var(--text)] opacity-60">
                <X size={16} className="text-[var(--red-secondary)] flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[var(--principal-secondary-color)] border-2 border-[var(--shadow)] rounded-2xl p-8 w-full max-w-sm min-w-[280px] relative shadow-(--shadow)">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2 text-[var(--text)]">
              Plan Semanal
            </h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-[var(--blue-main)]">
                $25
              </span>
              <span className="text-base text-[var(--text)] opacity-70">
                /semana
              </span>
            </div>
          </div>

            <div className='w-full flex items-center justify-center mb-8'>
            <Button 
            >
                Obtener Semanal
            </Button>
          </div>

          <ul className="list-none p-0 m-0">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 mb-3 text-sm text-[var(--text)]">
                <Check size={16} className="text-[var(--green-secondary)] flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-[rgba(4,59,147,1)] to-[rgba(7,11,85,1)] border-2 border-[var(--blue-main)] rounded-2xl p-8 w-full max-w-sm min-w-[280px] relative shadow-xl shadow-[rgba(19,103,241,0.3)] scale-[1.02]">
          {/* Popular Badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--blue-main)] text-white py-2 px-4 rounded-full text-sm font-semibold flex items-center gap-1 whitespace-nowrap">
            🔥 Mejor opción
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2 text-white">
              Plan Mensual
            </h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-white">
                $65
              </span>
              <span className="text-base text-white opacity-80">
                /mes
              </span>
            </div>
          </div>

            <div className='w-full flex items-center justify-center mb-8'>
            <Button variant='premium'
            >
               Obetener Premium 🚀
            </Button>
          </div>

          <ul className="list-none p-0 m-0">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 mb-3 text-sm text-white">
                <Check size={16} className="text-white flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text)] flex items-center justify-center gap-2">
            <span className="text-2xl">👋</span>
            Preguntas frecuentes
          </h2>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-[var(--principal-secondary-color)] border border-[var(--shadow)] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-3">
                {faq.question}
              </h3>
              <p className="text-base text-[var(--text)] opacity-80 leading-relaxed m-0">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}