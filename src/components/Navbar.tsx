import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Compass, BookOpen, Calendar, Music } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isPlaying, onToggleAudio }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'A Revelação', href: '#hero', icon: Sparkles },
    { label: 'Memórias', href: '#memories', icon: Heart },
    { label: 'A Carta', href: '#letter', icon: BookOpen },
    { label: 'Constelação', href: '#constellation', icon: Compass },
    { label: 'Cápsula', href: '#capsule', icon: Calendar },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#020617]/80 backdrop-blur-md border-b border-[#f5e0c3]/10 py-4 shadow-2xl shadow-black/50'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Monogram / Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full border border-[#f5e0c3]/30 flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-sm group-hover:border-[#f5e0c3] transition-colors duration-500 shadow-inner">
            <span className="font-cinzel font-bold text-lg text-[#f5e0c3] group-hover:scale-105 transition-transform tracking-wider">K</span>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#f5e0c3]/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-sm font-semibold tracking-[0.25em] text-slate-200 group-hover:text-[#f5e0c3] transition-colors">
              KANNIKA
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#f5e0c3]/60 uppercase">
              19 de Maio • Elite Edition
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-xs font-medium tracking-widest text-slate-300 hover:text-[#f5e0c3] transition-colors duration-300 py-1 relative group uppercase"
              >
                <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-[#f5e0c3] transition-all duration-300" />
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#f5e0c3] transition-all duration-300 group-hover:w-full" />
              </a>
            );
          })}
        </nav>

        {/* Audio Quick Indicator / Action */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleAudio}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#f5e0c3]/20 bg-[#0f172a]/60 backdrop-blur-md hover:border-[#f5e0c3]/60 hover:bg-[#0f172a] transition-all duration-300 group shadow-lg"
            title={isPlaying ? "Pausar trilha sonora" : "Ouvir trilha sonora"}
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Music className={`w-3.5 h-3.5 text-[#f5e0c3] transition-transform duration-500 ${isPlaying ? 'animate-spin' : ''}`} />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5e0c3] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f5e0c3]"></span>
                </span>
              )}
            </div>
            <span className="text-xs font-mono tracking-wider text-slate-300 group-hover:text-white transition-colors">
              {isPlaying ? 'ÁUDIO ATIVO' : 'TRILHA SONORA'}
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
