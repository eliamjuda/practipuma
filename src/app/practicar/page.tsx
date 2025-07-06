"use client";

import Button from "@/components/ui/buttonPP";
import OptionCard from "./components/OptionCard";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import ReactKatex from '@pkasila/react-katex';

export default function Practicar() {

  const question = '¿Cuál de las siguientes funciones tiene un comportamiento creciente?';

return (
    <div className="h-screen w-screen flex flex-col">
      {/* Header - Fijo en la parte superior */}

      <Header/>

      {/* Contenido principal - Scrollable */}
      <div className="flex-1 overflow-y-auto flex justify-center">
        <div className="w-full md:w-[30%] p-2 md:p-8">

          {/* Progress */}
          <ProgressBar/>

          {/* Question */}
          <div className="min-h-[40%] flex items-center text-center  text-1xl md:text-xl font-medium mb-6 ">
            <ReactKatex>{question}</ReactKatex>
          </div>

          {/* Opciones */}
          <div className="space-y-2 ">

            <OptionCard/>
            <OptionCard/>
            <OptionCard/>
            <OptionCard/>

          </div>

          {/* Espacio adicional para evitar que el botón sticky tape el último elemento */}
          <div className="md:h-10 h-5"></div>
        </div>
      </div>
      
      {/* Botón Continuar - Sticky en la parte inferior */}
      <div className="bg-(--principal-secondary-color) sticky bottom-0 w-[100%] border-t border-(--shadow) h-[100px] flex justify-center items-center right-0 flex-shrink-0">
        <Button>Continuar</Button>
      </div>
    </div>
  );
}
