"use client";

import { Button } from "@/components/ui/buttonPP";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useUser } from "@/context/userContext";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Usar el contexto de usuario
  const { user, isLoading, firstName, initials, avatarUrl } = useUser();

  // Efecto para inicializar el tema desde localStorage o usar light por defecto
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const shouldUseDarkMode = savedTheme === 'dark' || (savedTheme === null && false);
    
    if (shouldUseDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setIsMenuOpen(false);
      }
      
      if (isUserMenuOpen && !target.closest('.user-menu') && !target.closest('.user-menu-button')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isUserMenuOpen]);

  // Componente Avatar reutilizable
  const Avatar = ({ size = 32, className = "" }: { size?: number; className?: string }) => (
    <div 
      className={`rounded-full bg-[var(--blue-main)] flex items-center justify-center text-white font-medium overflow-hidden ${className}`}
      style={{ width: size, height: size, fontSize: size < 40 ? '0.875rem' : '1rem' }}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.textContent = initials;
            }
          }}
        />
      ) : (
        initials
      )}
    </div>
  );

  return (
    <header className={`w-full bg-[var(--principal-main-color)] md:px-[20%] sticky top-0 z-50 ${
        hasScrolled ? 'border-b-2 border-[var(--shadow)]' : 'border-b-2 border-transparent'
      } transition-colors duration-300 ${className}`}>
      <div className="px-4 md:px-0">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/illustrations/pp-logo.svg"
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
              className="text-[var(--text)] hover:bg-[var(--principal-secondary-color)] p-4 rounded-2xl font-medium transition-colors duration-200"
            >
              Blog
            </Link>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="text-[var(--text)] hover:bg-[var(--principal-secondary-color)] p-4 rounded-2xl font-medium transition-colors duration-200 flex items-center">
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
              <div className={`absolute top-full bg-[var(--principal-secondary-color)] left-0 mt-2 w-56 rounded-2xl shadow-lg border border-[var(--shadow)] transition-all duration-200 ${
                isAboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                <div className="py-2">
                  <Link href="/privacy" className="block px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--principal-secondary-color)] hover:underline transition-colors duration-150">
                    Política de Privacidad
                  </Link>
                  <Link href="/terms" className="block px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--principal-secondary-color)] hover:underline transition-colors duration-150">
                    Términos y Condiciones
                  </Link>
                  <Link href="/contact" className="block px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--principal-secondary-color)] hover:underline transition-colors duration-150">
                    Contacto
                  </Link>
                </div>
              </div>
            </div>

            <ThemeToggle/>

            {/* User Menu or CTA Button */}
            {!isLoading && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="user-menu-button flex items-center space-x-2 p-2 rounded-2xl hover:bg-[var(--principal-secondary-color)] transition-colors duration-200"
                >
                  <Avatar size={32} />
                  <span className="hidden lg:block text-[var(--text)] font-medium">
                    {firstName}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-[var(--text)] transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                <div className={`user-menu absolute right-0 top-full mt-2 w-56 bg-[var(--principal-secondary-color)] rounded-2xl shadow-lg border border-[var(--shadow)] transition-all duration-200 ${
                  isUserMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-[var(--shadow)]">
                    <div className="flex items-center space-x-3">
                      <Avatar size={40} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--text)] truncate">
                          {firstName}
                        </p>
                        <p className="text-xs text-[var(--text)] opacity-60 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--shadow)] hover:bg-opacity-20 transition-colors duration-150" onClick={() => setIsUserMenuOpen(false)}>
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                      </svg>
                      Dashboard
                    </Link>
                    
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--shadow)] hover:bg-opacity-20 transition-colors duration-150" onClick={() => setIsUserMenuOpen(false)}>
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </Link>

                    <Link href="/pricing" className="flex items-center px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--shadow)] hover:bg-opacity-20 transition-colors duration-150" onClick={() => setIsUserMenuOpen(false)}>
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Mejorar Plan
                    </Link>

                    <div className="border-t border-[var(--shadow)] mt-2 pt-2">
                      {/* ✅ Cambiar a usar el route handler */}
                      <form action="/auth/signout" method="POST">
                        <button type="submit" className="flex items-center w-full px-4 py-2 text-sm text-[var(--red-secondary)] hover:bg-[var(--red-main)] hover:bg-opacity-20 transition-colors duration-150">
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Cerrar Sesión
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : !isLoading ? (
              <Link href="/auth/login">
                <Button className="ml-4">Iniciar Sesión</Button>
              </Link>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[var(--shadow)] animate-pulse"></div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {!isLoading && user && (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-menu-button relative"
              >
                <Avatar size={32} />
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hamburger-button flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute left-0 bottom-1 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile User Menu */}
        {!isLoading && user && (
          <div className={`user-menu md:hidden fixed top-16 right-4 w-64 bg-[var(--principal-secondary-color)] rounded-2xl shadow-lg border border-[var(--shadow)] transition-all duration-200 z-40 ${
            isUserMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          }`}>
            {/* User Info */}
            <div className="px-4 py-3 border-b border-[var(--shadow)]">
              <div className="flex items-center space-x-3">
                <Avatar size={40} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text)] truncate">
                    {firstName}
                  </p>
                  <p className="text-xs text-[var(--text)] opacity-60 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--shadow)] hover:bg-opacity-20 transition-colors duration-150" onClick={() => setIsUserMenuOpen(false)}>
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                </svg>
                Dashboard
              </Link>
              
              <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--shadow)] hover:bg-opacity-20 transition-colors duration-150" onClick={() => setIsUserMenuOpen(false)}>
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mi Perfil
              </Link>

              <Link href="/pricing" className="flex items-center px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--shadow)] hover:bg-opacity-20 transition-colors duration-150" onClick={() => setIsUserMenuOpen(false)}>
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Mejorar Plan
              </Link>

              <div className="border-t border-[var(--shadow)] mt-2 pt-2">
                {/* ✅ Cambiar a usar el route handler */}
                <form action="/auth/signout" method="POST">
                  <button type="submit" className="flex items-center w-full px-4 py-2 text-sm text-[var(--red-secondary)] hover:bg-[var(--red-main)] hover:bg-opacity-20 transition-colors duration-150" onClick={() => setIsUserMenuOpen(false)}>
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`mobile-menu md:hidden fixed top-16 right-0 w-full h-full bg-[var(--principal-main-color)] shadow-xl transform transition-all duration-300 ease-in-out origin-top-right ${
          isMenuOpen 
            ? 'opacity-100 scale-100 translate-x-0' 
            : 'opacity-0 scale-95 translate-x-4 pointer-events-none'
        }`}>
          <nav className={`p-6 space-y-6 transition-all duration-300 delay-100 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            
            <Link 
              href="/blog" 
              className="block text-[var(--text)] hover:text-[var(--blue-main)] font-medium py-3 px-4 rounded-lg hover:bg-[var(--principal-secondary-color)] transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>

            {/* Mobile About Section */}
            <div className="py-2">
              <p className="text-[var(--text)] text-sm font-semibold mb-4 opacity-75 px-4">Acerca de</p>
              <div className="pl-4 space-y-3">
                <Link 
                  href="/privacy" 
                  className="block text-[var(--text)] hover:text-[var(--blue-main)] text-sm py-2 px-4 rounded-md hover:bg-[var(--principal-secondary-color)] transition-all duration-300 transform hover:scale-105 opacity-90 hover:opacity-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Política de Privacidad
                </Link>
                <Link 
                  href="/terms" 
                  className="block text-[var(--text)] hover:text-[var(--blue-main)] text-sm py-2 px-4 rounded-md hover:bg-[var(--principal-secondary-color)] transition-all duration-300 transform hover:scale-105 opacity-90 hover:opacity-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Términos y Condiciones
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-[var(--text)] hover:text-[var(--blue-main)] text-sm py-2 px-4 rounded-md hover:bg-[var(--principal-secondary-color)] transition-all duration-300 transform hover:scale-105 opacity-90 hover:opacity-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-[var(--principal-secondary-color)] transition-all duration-300">
              <ThemeToggle />
            </div>

            {/* Mostrar botón solo si no hay usuario */}
            {!user && (
              <div className="pt-6 px-4">
                <Link href="/auth/login">
                  <Button onClick={() => setIsMenuOpen(false)} className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            )}

            {/* Mostrar botón de Dashboard si hay usuario */}
            {user && (
              <div className="pt-6 px-4">
                <Link href="/dashboard">
                  <Button onClick={() => setIsMenuOpen(false)} className="w-full">
                    Ir al Dashboard
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};