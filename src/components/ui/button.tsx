"use client";

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
  return (
    <button 
      className={`${styles.button} ${className}`}
      aria-label={typeof children === 'string' ? children : 'Button'}
      onClick={onClick}
      {...props}
    >
    </button>
  );
};

export default Button;