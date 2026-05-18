import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Sparkles, Award, MapPin } from 'lucide-react';

export const LoveTimeline: React.FC = () => {
  const milestones = [
    {
      year: 'O Início',
      title: 'O Encontro das Almas',
      location: 'Bangkok, Tailândia',
      description: 'O momento em que nossos caminhos se cruzaram. O universo conspirou para que dois mundos distintos se tornassem um só santuário de amor e cumplicidade.',
      icon: Heart,
    },
    {
      year: 'A Conexão',
      title: 'Promessas ao Pôr do Sol',
      location: 'Praias de Phuket',
      description: 'Sob a luz dourada do entardecer tailandês, selamos o compromisso de cuidarmos um do outro em todas as estações da vida.',
      icon: MapPin,
    },
    {
      year: 'A Parceria',
      title: 'Vitórias & Conquistas',
      location: 'Jornada Compartilhada',
      description: 'Cada obstáculo superado e cada meta alcançada provou que nossa união é feita de respeito mútuo, admiração e apoio incondicional.',
      icon: Award,
    },
    {
      year: '19 de Maio',
      title: 'A Celebração da Sua Luz',
      location: 'Hoje & Sempre',
      description: 'Hoje celebramos a mulher incrível que você é, Kannika. Sua doçura, inteligência e luz guiam os meus passos rumo a um futuro brilhante.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="timeline" className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 text-[#f5e0c3] mb-3">
          <Sparkles className="w-4 h-4 animate-pulse text-[#e8c5b8]" />
          <span className="font-cinzel text-xs tracking-[0.3em] uppercase font-semibold">Linha do Tempo Atemporal</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-4">
          A Nossa <span className="italic font-playfair text-[#f5e0c3]">História</span>
        </h2>
        <p className="font-sans text-xs md:text-sm text-slate-400 max-w-md mx-auto tracking-widest uppercase">
          Os marcos de uma jornada escrita nas estrelas.
        </p>
      </div>

      {/* Timeline Workspace */}
      <div className="relative border-l border-[#f5e0c3]/20 ml-4 md:ml-32 space-y-16 py-8">
        
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 md:pl-16 group"
            >
              {/* Timeline Dot / Icon */}
              <div className="absolute -left-[21px] top-1.5 w-10 h-10 rounded-full bg-[#020617] border-2 border-[#f5e0c3] flex items-center justify-center text-[#f5e0c3] group-hover:bg-[#f5e0c3] group-hover:text-[#020617] transition-all duration-500 shadow-xl shadow-[#f5e0c3]/20">
                <Icon className="w-4 h-4" />
              </div>

              {/* Year Badge (Desktop positioned to the left of the line) */}
              <div className="hidden md:block absolute -left-36 top-2.5 w-28 text-right font-cinzel text-sm font-bold text-[#f5e0c3] tracking-widest">
                {milestone.year}
              </div>

              {/* Content Box */}
              <div className="glass-panel rounded-3xl p-6 md:p-8 border border-[#f5e0c3]/15 group-hover:border-[#f5e0c3]/40 transition-all duration-500 shadow-xl">
                <div className="flex items-center gap-3 mb-2 md:hidden">
                  <span className="font-cinzel text-xs font-bold text-[#f5e0c3] tracking-widest bg-[#f5e0c3]/10 px-3 py-1 rounded-full border border-[#f5e0c3]/20">
                    {milestone.year}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs font-mono text-slate-400">{milestone.location}</span>
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#f5e0c3]" />
                  <span>{milestone.location}</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 font-normal group-hover:text-[#f5e0c3] transition-colors">
                  {milestone.title}
                </h3>

                <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          );
        })}

      </div>

    </section>
  );
};
