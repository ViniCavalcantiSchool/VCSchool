import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  lang: 'en' | 'pt';
  setLang: (lang: 'en' | 'pt') => void;
  t: {
    courses: string;
    mentorship: string;
    portfolio: string;
    contact: string;
    members: string;
  };
}

export default function Navbar({ lang, setLang, t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(targetId.substring(1));
      if (element) {
        setIsOpen(false);
        // Using a slight delay to allow the menu close animation to start
        // which helps the browser calculate the correct scroll position
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 10);
      } else {
        // Not on homepage, navigate to '/' then smooth-scroll
        setIsOpen(false);
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        setTimeout(() => {
          const homeEl = document.getElementById(targetId.substring(1));
          if (homeEl) {
            homeEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FCFBF8]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:py-4 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center">
          <a href="/" onClick={handleLogoClick} id="nav-logo-link" className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-[#0CA6DF] rounded-lg">
            <img 
              src="https://wp.vinicavalcanti.com/wp-content/uploads/2026/05/logo_vini_cavalcanti_3D.webp" 
              alt="Vini Cavalcanti School" 
              className="h-10 w-auto sm:h-12"
              width="180"
              height="48"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          <a id="nav-link-courses" onClick={(e) => handleNavClick(e, '#courses')} className="text-sm font-medium text-black/70 hover:text-black transition-colors focus-visible:text-black outline-none" href="#courses">{t.courses}</a>
          <a id="nav-link-mentorship" onClick={(e) => handleNavClick(e, '#mentorship')} className="text-sm font-medium text-black/70 hover:text-black transition-colors focus-visible:text-black outline-none" href="#mentorship">{t.mentorship}</a>
          <a 
            id="nav-link-portfolio"
            className="text-sm font-medium text-black/70 hover:text-black transition-colors focus-visible:text-black outline-none" 
            href="https://www.artstation.com/viniciuscavalcanti" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {t.portfolio}
          </a>
          <a id="nav-link-contact" className="text-sm font-medium text-black/70 hover:text-black transition-colors focus-visible:text-black outline-none" href="#contact">{t.contact}</a>
          <button 
            onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
            className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm shadow-sm hover:bg-black/5 transition-colors cursor-pointer"
          >
            {lang === 'en' ? 'EN | PT' : 'PT | EN'}
          </button>
          <a 
            id="nav-members-desktop"
            className="btn-portal rounded-full bg-[#0CA6DF] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#0995c9] hover:shadow-lg transition-all" 
            href={t.members} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {lang === 'en' ? 'Members Area' : 'Área de Membros'}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="rounded-lg p-3 text-black/70 hover:bg-black/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#0CA6DF] outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-[#FCFBF8] md:hidden border-t border-black/5"
          >
            <div className="flex flex-col gap-1 px-4 pb-8 pt-4">
              <a 
                href="#courses" 
                id="mobile-nav-courses"
                onClick={(e) => handleNavClick(e, '#courses')}
                className="rounded-xl px-4 py-3.5 text-lg font-medium text-black/80 hover:bg-black/5 active:bg-black/5 transition-colors"
              >
                {t.courses}
              </a>
              <a 
                href="#mentorship" 
                id="mobile-nav-mentorship"
                onClick={(e) => handleNavClick(e, '#mentorship')}
                className="rounded-xl px-4 py-3.5 text-lg font-medium text-black/80 hover:bg-black/5 active:bg-black/5 transition-colors"
              >
                {t.mentorship}
              </a>
              <a 
                href="https://www.artstation.com/viniciuscavalcanti" 
                id="mobile-nav-portfolio"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3.5 text-lg font-medium text-black/80 hover:bg-black/5 active:bg-black/5 transition-colors"
              >
                {t.portfolio}
              </a>
              <a 
                href="#contact" 
                id="mobile-nav-contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="rounded-xl px-4 py-3.5 text-lg font-medium text-black/80 hover:bg-black/5 active:bg-black/5 transition-colors"
              >
                {t.contact}
              </a>
              <div className="flex px-4 pt-4">
                <button 
                  onClick={() => {
                    setLang(lang === 'en' ? 'pt' : 'en');
                    toggleMenu();
                  }}
                  className="w-full rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold shadow-sm active:scale-95 transition-all text-black/70"
                >
                  {lang === 'en' ? 'EN | PT' : 'PT | EN'}
                </button>
              </div>
              <div className="px-4">
                <a 
                  href={t.members} 
                  id="nav-members-mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMenu}
                  className="btn-portal mt-4 block rounded-full bg-[#0CA6DF] px-6 py-4 text-center text-lg font-semibold text-white shadow-md active:scale-95 transition-all"
                >
                  {lang === 'en' ? 'Members Area' : 'Área de Membros'}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
