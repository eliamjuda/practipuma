import ReactKatex from "@pkasila/react-katex";

interface OptionCardProps {
  letter: string; // "A", "B", "C", etc.
  content: string;
  selected: boolean;
  isCorrect: boolean | null; // null si aún no ha confirmado
  showCorrect?: boolean; // Para mostrar la respuesta correcta cuando se confirma
  onClick: () => void;
}

export default function OptionCard({
  letter,
  content,
  selected,
  isCorrect,
  showCorrect = false,
  onClick,
}: OptionCardProps) {
  const baseStyle =
    "cursor-pointer px-1 py-2 border-1 transition-colors hover:border-(--shadow-hover) w-full rounded-lg mb-3";

  const getCardStyle = () => {
    // Si ya se confirmó
    if (isCorrect !== null) {
      if (selected) {
        // Opción seleccionada después de confirmar
        return isCorrect
          ? "border-green-600 bg-(--green-main)" // Correcta
          : "border-red-600 bg-(--red-main)";   // Incorrecta
      }
      // Si no está seleccionada pero es la respuesta correcta, mostrarla en verde
      if (showCorrect) {
        return "border-green-600 bg-green-100";
      }
      // Otras opciones no seleccionadas después de confirmar
      return "border-(--shadow) bg-(--principal-secondary-color)";
    }
    
    // Antes de confirmar
    if (selected) {
      return "border-(--bg-stage) bg-(--bg-stage) text-white"; // Seleccionada (azul)
    }
    
    // No seleccionada
    return "border-(--shadow) bg-(--principal-secondary-color)";
  };

  const baseStyleSpan = "rounded-lg mr-4 border-1 py-2 px-4";
  
  const getSpanStyle = () => {
    // Si ya se confirmó
    if (isCorrect !== null) {
      if (selected) {
        // Opción seleccionada después de confirmar
        return isCorrect
          ? "border-green-600 bg-green-600 text-white" // Correcta
          : "border-red-600 bg-red-600 text-white";   // Incorrecta
      }
      // Si no está seleccionada pero es la respuesta correcta, mostrarla en verde
      if (showCorrect) {
        return "border-green-600 bg-green-600 text-white";
      }
      // Otras opciones no seleccionadas después de confirmar
      return "border-(--shadow) bg-(--principal-secondary-color)";
    }
    
    // Antes de confirmar
    if (selected) {
      return "border-(--blue-main) bg-(--blue-main) text-white"; // Seleccionada (azul)
    }
    
    // No seleccionada
    return "border-(--shadow) bg-(--principal-secondary-color)";
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${getCardStyle()}`}
      disabled={isCorrect !== null} // Deshabilitar después de confirmar
    >
      <div className="text-left h-auto min-h-full flex items-center">
        <span className={`${baseStyleSpan} ${getSpanStyle()} flex items-center`}>
          {letter}
        </span>
        <span className="w-[500px]">
          <ReactKatex>{content}</ReactKatex>
        </span>
      </div>
    </button>
  );
}