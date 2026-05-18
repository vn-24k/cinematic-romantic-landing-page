import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Heart, Sparkles } from 'lucide-react';

export interface Memory {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  excerpt: string;
  description: string;
  quote: string;
  thaiQuote?: string;
}

interface MemoryModalProps {
  memory: Memory | null;
  onClose: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({ memory, onClose }) => {
  if (!memory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-[#0f172a]/90 border border-[#f5e0c3]/20 rounded-3xl overflow-hidden shadow-2xl shadow-black max-h-[90vh] flex flex-col md:flex-row my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-[#020617]/80 border border-[#f5e0c3]/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#f5e0c3] hover:scale-110 transition-all duration-300 shadow-lg group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Left / Top Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-[#020617]">
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0f172a]" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#f5e0c3]/90 bg-[#020617]/60 backdrop-blur-md px-4 py-2 rounded-xl border border-[#f5e0c3]/20">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {memory.date}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {memory.location}</span>
            </div>
          </div>

          {/* Right / Bottom Content Section */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#f5e0c3]/10 text-[#f5e0c3] border border-[#f5e0c3]/20">
                  {memory.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                  <Sparkles className="w-3 h-3 text-[#e8c5b8]" /> Elite Memory
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl md:text-4xl text-white mb-4 leading-tight font-normal">
                {memory.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed font-light mb-6 border-l-2 border-[#f5e0c3]/30 pl-4 py-1 bg-slate-900/30 rounded-r-lg">
                {memory.description}
              </p>

              {/* Quotes */}
              <div className="space-y-4 my-6 p-6 rounded-2xl bg-[#020617]/60 border border-[#f5e0c3]/15 relative">
                <Heart className="absolute top-4 right-4 w-5 h-5 text-[#f5e0c3]/20" />
                <p className="font-serif italic text-[#f5e0c3] text-lg leading-relaxed">
                  "{memory.quote}"
                </p>
                {memory.thaiQuote && (
                  <p className="font-thai text-sm text-[#e8c5b8] tracking-wide pt-2 border-t border-[#f5e0c3]/10">
                    "{memory.thaiQuote}"
                  </p>
                )}
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Kannika & Você</span>
                <span>•</span>
                <span className="text-[#f5e0c3]">Eternizado</span>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#f5e0c3] to-[#e8c5b8] text-[#020617] font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity shadow-lg shadow-[#f5e0c3]/20"
              >
                Fechar Memória
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
