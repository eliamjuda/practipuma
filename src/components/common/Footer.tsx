import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-(--principal-secondary-color) text-(--text) mt-24 py-12 px-6">
    <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 justify-items-center md:justify-items-start text-center md:text-left">
        {/* Logo and Tagline */}
        <div>
            <div className="flex items-center justify-center md:justify-start mb-0">
            <div className="w-30 h-30 rounded-sm flex items-center justify-center mr-3">
                <Image
                src="/images/illustrations/pp-logo.svg"
                width={100}
                height={100}
                alt="Logo PractiPuma"
                />
            </div>
            </div>
            <p className="text-sm text-(--text) mb-4">PractiPuma</p>
            <p className="text-xs">Copyright © 2022</p>
        </div>

        {/* Navigation Links - Column 1 */}
        <div className='md:mt-12'>
            <nav className="space-y-3">
            <Link href="/" className="block text-sm text-(--text) hover:text-white transition-colors">
                Inicio
            </Link>
            <Link href="/contact" className="block text-sm text-(--text) hover:text-white transition-colors">
                Contáctanos
            </Link>
            </nav>
        </div>

        {/* Navigation Links - Column 2 */}
        <div className='md:mt-12'>
            <nav className="space-y-3">
            <Link href="/terminos-condiciones" className="block text-sm text-(--text) hover:text-white transition-colors">
                Términos y condiciones
            </Link>
            <Link href="/privacy" className="block text-sm text-(--text) hover:text-white transition-colors">
                Política de privacidad
            </Link>
            </nav>
        </div>

        {/* Navigation Links - Column 3 */}
        <div className='md:mt-12'>
            <nav className="space-y-3">
            <Link href="/blog" className="block text-sm text-(--text) hover:text-white transition-colors">
                Blog
            </Link>
            </nav>
        </div>
        </div>

        {/* Divider */}
        <div className="border-t border-(--shadow) my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
            {/* Instagram */}
            <Link href="https://instagram.com" className="text-(--text) hover:text-white transition-colors" aria-label="Instagram">
            {/* SVG aquí */}
            </Link>
            {/* Facebook */}
            <Link href="https://facebook.com" className="text-(--text) hover:text-white transition-colors" aria-label="Facebook">
            {/* SVG aquí */}
            </Link>
            {/* TikTok */}
            <Link href="https://tiktok.com" className="text-(--text) hover:text-white transition-colors" aria-label="TikTok">
            {/* SVG aquí */}
            </Link>
        </div>

        {/* Contact Button */}
        <Link
            href="/contact"
            className="bg-(--blue-main) hover:bg-(--blue-secondary) text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
            CONTACTANOS
        </Link>
        </div>
    </div>
    </footer>

  );
};

export default Footer;