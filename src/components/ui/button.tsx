"use client";

import useSound from "use-sound";
import styles from "@/components/modules/button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children = "Practicar", 
  onClick, 
  className = "",
  ...props 
}) => {

  const [playClick] = useSound("/sounds/pop.mp3", {
    volume: 0.3, 
  });

  return (
    <button 
      className={`${styles.button} ${className}`}
      aria-label={typeof children === 'string' ? children : 'Button'}
      onClick={(event) => {
        playClick(); 
        onClick?.(event); // llama tu lógica si existe
      }}
      {...props}
    >
    </button>
  );
};

export default Button;