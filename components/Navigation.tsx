
import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, School } from 'lucide-react';
import Button from './Button';

interface NavigationProps {
  onOpenApplication: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenApplication }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Why Online?', href: '#why-online' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-brainy-navy/95 backdrop-blur-md border-slate-700 py-2' 
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {!logoError ? (
            <img 
              src="https://brainybayschools.com/wp-content/uploads/2023/10/cropped-BRAINYBAY-SCHOOLS-LOGO-01-192x192.png" 
              alt="Brainybay Schools Logo" 
              className="h-14 w-auto object-contain bg-white rounded-lg p-1"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="h-14 w-14 bg-white rounded-lg p-1 flex items-center justify-center">
              <School className="w-8 h-8 text-brainy-navy" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white tracking-tight leading-none">Brainybay</span>
            <span className="text-xs text-brainy-red font-semibold uppercase tracking-widest hidden sm:block">International Schools</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="h-6 w-px bg-slate-700 mx-2"></div>
          <a 
            href="https://learn.brainybayschools.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm font-medium text-white hover:text-brainy-gold transition-colors flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            Student Login
          </a>
          <Button variant="primary" size="sm" onClick={onOpenApplication}>
            Apply Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brainy-navy border-t border-slate-800 absolute w-full pb-6 shadow-xl">
          <div className="flex flex-col space-y-4 px-6 pt-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-brainy-red"
              >
                {link.name}
              </a>
            ))}
            <hr className="border-slate-800" />
            <a 
               href="https://learn.brainybayschools.com"
               className="text-lg font-medium text-white flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5 text-brainy-gold" />
              Student Login
            </a>
            <Button 
              variant="primary" 
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApplication();
              }}
            >
              Apply Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
