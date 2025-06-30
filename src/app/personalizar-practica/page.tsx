'use client'

import Button from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { PageTransition } from '@/components/common/PageTransitions';

const PracticeConfigInterface = () => {
  const [selectedQuestions, setSelectedQuestions] = useState('10');
  const [selectedSubject, setSelectedSubject] = useState('Historia Universal');
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [selectedTime, setSelectedTime] = useState('30m');
  const [showJustifications, setShowJustifications] = useState(true);


  // Datos de ejemplo para diferentes modos de práctica
  const practiceMode = {
    title: "Materia",
    description: "Enfócate en una materia específica para fortalecer tus conocimientos. Ideal para repasar temas que necesitas reforzar o para profundizar en áreas de tu interés.",
    icon: <div className="w-8 h-8 text-white" />
  };

  const questionOptions = [
    '5',
    '10',
    '15',
    '20',
    '25'
  ];

  const subjectOptions = [
    'Historia Universal',
    'Historia de México',
    'Matemáticas',
    'Español',
    'Geografía',
    'Literatura',
    'Física'
  ];

  console.log("Selected Questions:", selectedQuestions);
  console.log("Selected Subject:", selectedSubject);

  const timeOptions = [
    { label: '15m', value: '15m' },
    { label: '30m', value: '30m' },
    { label: '45m', value: '45m' },
    { label: '60m', value: '60m' }
  ];

  return (
    <PageTransition>
      <div className="h-[100dvh] relative w-[100%] p-4 md:p-0 md:w-auto flex items-center justify-center">
        <div className="md:max-w-2xl w-[100%] mx-auto">
          <div className="flex items-center mb-6">
            <Link href={"/dashboard"}>
              <button className="cursor-pointer flex items-center transition-colors text-(--text)">
                <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
                <p className='mx-2 font-medium'>Configurar práctica</p>
              </button>
            </Link>
          </div>

          {/* Mode Card */}
          <div className="bg-(--principal-secondary-color) rounded-lg border border-(--shadow) p-4 md:p-2 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block md:h-[80px] md:w-[80px] rounded-lg p-3 flex-shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-[var(--blue-main)] opacity-30" />
                <div className="relative z-10 flex items-center justify-center h-full w-full">
                  <Image src={"/images/illustrations/practica-5.svg"} width={300} height={300} alt='Imagen de la materia' />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibol">
                  {practiceMode.title}
                </h2>
                <p className="text-sm leading-relaxed">
                  {practiceMode.description}
                </p>
              </div>
            </div>
          </div>

          {/* Configuration Card */}
          <div className="bg-(--principal-secondary-color)  rounded-lg border border-(--shadow) p-6 mb-8">
            {/* Number of Questions */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-medium text-(--text)">
                  🔢 Número de preguntas
                </label>
              </div>
              <Select onValueChange={(e) => setSelectedQuestions(e)}>
                  <SelectTrigger className="w-full p-3">
                      <SelectValue placeholder="Seleccionar cantidad" />
                  </SelectTrigger>
                  <SelectContent>
                      {questionOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
              {/* <select 
                value={selectedQuestions}
                onChange={(e) => setSelectedQuestions(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-(--text) focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {questionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select> */}
            </div>

            {/* Subject */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <label className="text-sm font-medium text-(--text)">
                  📙 Materia
                </label>
              </div>
              <Select onValueChange={(e) => setSelectedSubject(e)}>
                  <SelectTrigger className="w-full p-3">
                      <SelectValue placeholder="Seleccionar materia" />
                  </SelectTrigger>
                  <SelectContent>
                      {subjectOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>

            {/* Timer */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-(--text)">
                    ⌛ Reloj
                  </label>
                </div>
                <button
                  onClick={() => setTimerEnabled(!timerEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    timerEnabled ? 'bg-(--blue-main)' : 'bg-(--principal-main-color) border border-(--shadow)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      timerEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text(--text) mb-3">
                Añade un poco más de presión con un timer
              </p>
              
              {timerEnabled && (
                <div className="flex gap-2">
                  {timeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedTime(option.value)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                        selectedTime === option.value
                          ? 'bg-(--blue-main) text-white border-(--blue-main)'
                          : 'bg-(--principal-main-color) text-(--text) border-(--shadow) hover:border-(--blue-main)'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Show Justifications */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-(--text)">
                    ✍️ Mostrar justificaciones
                  </label>
                </div>
                <button
                  onClick={() => setShowJustifications(!showJustifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    showJustifications ? 'bg-(--blue-main)' : 'bg-(--principal-secondary-color) border border-(--shadow)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white border-(--shadow) transition-transform ${
                      showJustifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-(--text)">
                Aprende con cada respuesta
              </p>
            </div>
          </div>

        </div>
              {/* Start Button */}
              <div className='bg-(--principal-secondary-color) absolute bottom-0 w-[100%] border-t border-(--shadow) h-[100px] flex justify-center items-center right-0'>
                  <Button>
                      Comenzar a practicar
                  </Button>
              </div>
      </div>
    </PageTransition>
  );
};

export default PracticeConfigInterface;