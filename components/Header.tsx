import React, { useState, useEffect, MouseEvent } from 'react';
import type { FC } from 'react';
import { NAV_LINKS } from '../constants';
import ThemeToggle from './ThemeToggle';

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
          window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY - 80, // 80px offset for header
              behavior: 'smooth'
          });
          setIsMenuOpen(false);
      }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg bg-white/90 dark:bg-agri-dark/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700' : 'bg-transparent border-b border-transparent'}`}>
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a href="#" className="flex items-center space-x-2" onClick={(e) => handleLinkClick(e, '#home')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-agri-green to-agri-blue flex items-center justify-center">
              <i className="fas fa-seedling text-white"></i>
            </div>
            <span className="font-heading text-xl font-bold text-gray-800 dark:text-white">AgriBlu</span>
          </a>
        </div>


        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="nav-link relative text-gray-700 dark:text-white hover:text-agri-green transition-colors duration-300">
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")} className="bg-agri-green hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300 animate-pulse-once">
            Request a Demo
          </a>
        </div>
        
        <button className="md:hidden text-gray-800 dark:text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-agri-dark bg-opacity-95 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="block text-gray-700 dark:text-white hover:text-agri-green py-2">{link.name}</a>
            ))}
            <a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")} className="bg-agri-green hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full w-full text-center transition-colors duration-300 animate-pulse-once">
              Request a Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;