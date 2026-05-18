import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Heart, MapPin, Calendar } from 'lucide-react';
import { Memory } from './MemoryModal';

interface BentoGridProps {
  onSelectMemory: (memory: Memory) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onSelectMemory }) => {
  const [activeFilter, setActiveFilter] = useState<string>('Todas');

  const memories: Memory[] = [
    {
      id: '1',
      title: 'O Primeiro Olhar',
      date: '19 de Maio',
      location: 'Bangkok, Tailândia',
      category: 'Romance',
      image: 'https://images.unsplash.com/photo-1510076857177-74700f69422b?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'O instante em que o tempo parou e o universo fez sentido pela primeira vez.',
      description: 'Lembro-me da luz suave daquele dia, refletindo em seus olhos como constelações recém-nascidas. Não foi apenas um encontro; foi o reconhecimento de duas almas que já se procuravam há vidas. Cada segundo ao seu lado desde então tem sido um presente inestimável.',
      quote: 'Você é a poesia que eu sempre quis escrever.',
      thaiQuote: 'คุณคือบทกวีที่ฉันอยากเขียนมาตลอด',
    },
    {
      id: '2',
      title: 'Pôr do Sol em Phuket',
      date: 'Verão Inesquecível',
      location: 'Phuket, Tailândia',
      category: 'Tailândia',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Águas cristalinas e um horizonte pintado com as cores do nosso amor.',
      description: 'Caminhar de mãos dadas pelas areias mornas de Phuket enquanto o sol mergulhava no mar de Andaman. O som das ondas parecia sussurrar seu nome, Kannika. Aquele entardecer dourado ficou gravado na minha memória como uma pintura eterna.',
      quote: 'Onde quer que estejamos, meu lar é o seu abraço.',
      thaiQuote: 'ไม่ว่าเราจะอยู่ที่ไหน บ้านของฉันคืออ้อมกอดของคุณ',
    },
    {
      id: '3',
      title: 'Brinde às Nossas Conquistas',
      date: 'Noite de Celebração',
      location: 'Rooftop Exclusivo',
      category: 'Intimidade',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Taças erguidas sob as estrelas, celebrando cada passo da nossa jornada.',
      description: 'Uma noite dedicada a celebrar você, sua força, sua elegância e tudo o que construímos juntos. O brilho do champagne não se comparava ao brilho do seu sorriso quando comemoramos mais um marco na nossa história.',
      quote: 'A cada conquista sua, meu coração celebra em dobro.',
      thaiQuote: 'ทุกความสำเร็จของคุณ หัวใจของฉันฉลองเป็นสองเท่า',
    },
    {
      id: '4',
      title: 'Sob o Céu Estrelado',
      date: 'Noites Mágicas',
      location: 'Chiang Mai, Tailândia',
      category: 'Aventuras',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'O silêncio da noite quebrado apenas pelos nossos sussurros e promessas.',
      description: 'Afastados da agitação da cidade, deitamos sob um manto infinito de estrelas. Ali, compreendi a imensidão do que sentimos. Você me ensinou a ver a beleza nos detalhes mais simples e sublimes da vida.',
      quote: 'Até as estrelas parecem ofuscadas pela sua luz.',
      thaiQuote: 'แม้แต่ดวงดาวก็ยังดูหม่นหมองเมื่อเทียบกับแสงสว่างของคุณ',
    },
    {
      id: '5',
      title: 'Jantares Intimistas',
      date: 'Momentos a Dois',
      location: 'Alta Gastronomia',
      category: 'Intimidade',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Conversas intermináveis à meia-luz, regadas a vinho e cumplicidade.',
      description: 'Nossos jantares são santuários onde o mundo lá fora deixa de existir. Entre risadas cúmplices e olhares intensos, redescubro todos os dias os motivos pelos quais me apaixonei por você, Kannika.',
      quote: 'Com você, o tempo não passa, ele se eterniza.',
      thaiQuote: 'เมื่อมีคุณ เวลาไม่ได้ผ่านไป แต่กลายเป็นนิรันดร์',
    },
    {
      id: '6',
      title: 'Caminhos de Serenidade',
      date: 'Manhãs de Domingo',
      location: 'Santuário de Paz',
      category: 'Romance',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'A paz indescritível de acordar ao seu lado e ver o dia nascer.',
      description: 'Não há nada mais precioso do que a tranquilidade das nossas manhãs. Ver o sol iluminar suavemente seu rosto enquanto você sorri me dá a certeza de que encontrei o meu verdadeiro propósito.',
      quote: 'Você é a minha paz em meio ao caos do mundo.',
      thaiQuote: 'คุณคือความสงบสุขของฉันท่ามกลางความวุ่นวายของโลก',
    },
  ];

  const filters = ['Todas', 'Romance', 'Tailândia', 'Aventuras', 'Intimidade'];

  const filteredMemories = activeFilter === 'Todas'
    ? memories
    : memories.filter((m) => m.category === activeFilter);

  return (
    <section id="memories" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[#f5e0c3]/15 pb-8">
        <div>
          <div className="flex items-center gap-2 text-[#f5e0c3] mb-3">
            <Sparkles className="w-4 h-4 animate-pulse text-[#e8c5b8]" />
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase font-semibold">Bento Box Masterpiece</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            Fragmentos da Nossa <span className="italic font-playfair text-[#f5e0c3]">Eternidade</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border ${
                activeFilter === filter
                  ? 'bg-[#f5e0c3] text-[#020617] border-[#f5e0c3] font-bold shadow-lg shadow-[#f5e0c3]/20'
                  : 'bg-[#0f172a]/60 text-slate-300 border-[#f5e0c3]/20 hover:border-[#f5e0c3]/60 hover:text-white backdrop-blur-sm'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {filteredMemories.map((memory, index) => {
          // Dynamic span classes for Bento Box aesthetic
          let spanClasses = 'md:col-span-1 md:row-span-1';
          if (index === 0) spanClasses = 'md:col-span-2 md:row-span-2';
          if (index === 3) spanClasses = 'md:col-span-2 md:row-span-1';
          if (index === 4) spanClasses = 'md:col-span-1 md:row-span-2';

          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectMemory(memory)}
              className={`group relative rounded-3xl overflow-hidden bg-[#0f172a]/40 border border-[#f5e0c3]/15 hover:border-[#f5e0c3]/50 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-[#f5e0c3]/10 flex flex-col justify-end min-h-[320px] md:min-h-[400px] ${spanClasses}`}
            >
              {/* Background Image with Hover Scale & Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                {/* Elegant Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[#0f172a]/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Top Badges */}
              <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#020617]/80 backdrop-blur-md text-[#f5e0c3] border border-[#f5e0c3]/20">
                  {memory.category}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#020617]/80 backdrop-blur-md border border-[#f5e0c3]/20 flex items-center justify-center text-[#f5e0c3] group-hover:bg-[#f5e0c3] group-hover:text-[#020617] transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                <div className="flex items-center gap-4 text-[11px] font-mono text-[#f5e0c3]/80 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {memory.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {memory.location}</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-white font-normal mb-2 group-hover:text-[#f5e0c3] transition-colors duration-300">
                  {memory.title}
                </h3>

                <p className="font-sans text-xs md:text-sm text-slate-300 line-clamp-2 font-light opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {memory.excerpt}
                </p>

                {/* Hover Reveal CTA */}
                <div className="mt-4 pt-4 border-t border-[#f5e0c3]/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#f5e0c3] flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#e8c5b8] fill-[#e8c5b8]" /> Ler História Completa
                  </span>
                  <span className="text-xs font-cinzel text-slate-400">Kannika 19.05</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
