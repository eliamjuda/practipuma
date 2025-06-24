"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../ui/ThemeToggle";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Efecto para inicializar el tema desde localStorage o usar light por defecto
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    // Prioridad: localStorage > light mode por defecto
    const shouldUseDarkMode = savedTheme === 'dark' || (savedTheme === null && false); // Cambié a false para light por defecto
    
    setIsDarkMode(shouldUseDarkMode);
    
    if (shouldUseDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={`w-full bg-(--principal-main-color) md:px-[20%] sticky top-0 z-50 ${
  hasScrolled ? 'border-b-2 border-(--shadow)' : 'border-b-2 border-transparent'
} transition-colors duration-300 ${className}`}>
      <div className="px-4 md:px-0">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="images/illustrations/pp-logo.svg"
              alt="PractiPuma Logo"
              width={120}
              height={40}
              className="h-20 md:h-35 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">            
            <Link 
              href="/blog" 
              className="text-(--text) hover:bg-(--principal-secondary-color) p-4 rounded-2xl font-medium transition-colors duration-200"
            >
              Blog
            </Link>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="text-(--text) hover:bg-(--principal-secondary-color) p-4 rounded-2xl font-medium transition-colors duration-200 flex items-center">
                Acerca de
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full bg-(--principal-secondary-color) left-0 mt-2 w-56 rounded-2xl shadow-lg border border-(--shadow) transition-all duration-200 ${
                isAboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="py-2">
                  <Link 
                    href="/privacy" 
                    className="block px-4 py-2 text-sm text-(--text) hover:bg-(--principal-secondary-color) hover:underline transition-colors duration-150"
                  >
                    Política de Privacidad
                  </Link>
                  <Link 
                    href="/terms" 
                    className="block px-4 py-2 text-sm text-(--text) hover:bg-(--principal-secondary-color) hover:underline  transition-colors duration-150"
                  >
                    Términos y Condiciones
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block px-4 py-2 text-sm text-(--text) hover:bg-(--principal-secondary-color) hover:underline  transition-colors duration-150"
                  >
                    Contacto
                  </Link>
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle/>

            {/* CTA Button */}
            <Button className="ml-4">
              Practicar
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="hamburger-button md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 top-1 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`absolute left-0 top-1/2 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`absolute left-0 bottom-1 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
         <div className={`mobile-menu md:hidden fixed top-15 right-0 w-full h-full bg-(--principal-main-color) shadow-xl transform transition-all duration-300 ease-in-out origin-top-right ${
          isMenuOpen 
            ? 'opacity-100 scale-100 translate-x-0' 
            : 'opacity-0 scale-95 translate-x-4 pointer-events-none'
        }`}>
          <nav className={`p-6 space-y-6 transition-all duration-300 delay-100 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            
            <Link 
              href="/blog" 
              className="block text-(--text) hover:text-(--blue-main) font-medium py-3 px-4 rounded-lg hover:bg-(--principal-secondary-color) transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>

            {/* Mobile About Section */}
            <div className="py-2">
              <p className="text-(--text) text-sm font-semibold mb-4 opacity-75 px-4">Acerca de</p>
              <div className="pl-4 space-y-3">
                <Link 
                  href="/privacy" 
                  className="block text-(--text) hover:text-(--blue-main) text-sm py-2 px-4 rounded-md hover:bg-(--principal-secondary-color) transition-all duration-300 transform hover:scale-105 opacity-90 hover:opacity-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Política de Privacidad
                </Link>
                <Link 
                  href="/terms" 
                  className="block text-(--text) hover:text-(--blue-main) text-sm py-2 px-4 rounded-md hover:bg-(--principal-secondary-color) transition-all duration-300 transform hover:scale-105 opacity-90 hover:opacity-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Términos y Condiciones
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-(--text) hover:text-(--blue-main) text-sm py-2 px-4 rounded-md hover:bg-(--principal-secondary-color) transition-all duration-300 transform hover:scale-105 opacity-90 hover:opacity-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-(--principal-secondary-color) transition-all duration-300">
              <ThemeToggle />
            </div>

            <div className="pt-6 px-4">
              <Button 
                onClick={() => setIsMenuOpen(false)}
              >
                Comenzar a Practicar
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};