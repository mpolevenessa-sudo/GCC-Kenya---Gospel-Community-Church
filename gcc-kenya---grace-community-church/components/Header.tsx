
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#' },
    { name: 'Ministries', href: '#ministries' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Contact', href: '#' },
    { name: 'Give', href: '#' },
  ];

  return (
    <header className={`fixed w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            G
          </div>
          <span className={`font-bold text-lg hidden sm:block ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
            GCC KENYA
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className={`text-sm font-semibold transition-colors ${
                isScrolled ? 'text-slate-600 dark:text-slate-300 hover:text-primary-600' : 'text-slate-100 hover:text-primary-300'
              }`}
            >
              {item.name}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="block text-lg font-medium text-slate-900 dark:text-slate-100 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold">
              Join Us This Sunday
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
