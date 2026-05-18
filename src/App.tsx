import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { BilingualLetter } from './components/BilingualLetter';
import { Constellation } from './components/Constellation';
import { LoveTimeline } from './components/LoveTimeline';
import { TimeCapsule } from './components/TimeCapsule';
import { AudioWidget } from './components/AudioWidget';
import { MemoryModal, Memory } from './components/MemoryModal';
import { Heart, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-[#f5e0c3]/20 selection:text-[#f5e0c3] relative overflow-x-hidden">
      
      {/* Global Navigation */}
      <Navbar isPlaying={isPlaying} onToggleAudio={toggleAudio} />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <BentoGrid onSelectMemory={setSelectedMemory} />
        <BilingualLetter />
        <Constellation />
        <LoveTimeline />
        <TimeCapsule />
      </main>

      {/* Floating Elite Audio Widget */}
      <AudioWidget isPlaying={isPlaying} onTogglePlay={toggleAudio} />

      {/* Expanded Memory Modal */}
      <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />

      {/* Premium Cinematic Footer */}
      <footer className="relative z-10 border-t border-[#f5e0c3]/10 bg-[#0f172a]/40 backdrop-blur-lg py-16 px-6 md:px-12 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <a href="#hero" className="flex items-center gap-3 mb-4 group">
              <div className="w-8 h-8 rounded-full border border-[#f5e0c3]/30 flex items-center justify-center bg-[#020617]/80 group-hover:border-[#f5e0c3] transition-colors">
                <span className="font-cinzel font-bold text-sm text-[#f5e0c3]">K</span>
              </div>
              <span className="font-cinzel text-base tracking-[0.3em] text-white font-semibold">
                KANNIKA • 19 DE MAIO
              </span>
            </a>
            <p className="font-sans text-xs text-slate-400 max-w-sm font-light leading-relaxed">
              Uma experiência digital imersiva de nível sênior elite, concebida para eternizar um amor cinematográfico.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-2 text-[#f5e0c3] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#e8c5b8] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase font-semibold">Feito com Amor & Código</span>
            </div>
            <p className="font-serif italic text-sm text-slate-300 flex items-center gap-1.5 justify-center md:justify-end">
              Para aquela que ilumina o meu mundo <Heart className="w-4 h-4 text-[#e8c5b8] fill-[#e8c5b8] animate-pulse inline" />
            </p>
            <span className="text-[10px] font-mono text-slate-500 tracking-widest mt-2 uppercase">
              © 2026 • Todos os direitos reservados às estrelas
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default App;
