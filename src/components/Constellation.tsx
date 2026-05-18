import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Sparkles, Star, Navigation } from 'lucide-react';

interface CelestialNode {
  id: string;
  name: string;
  coords: string;
  top: string;
  left: string;
  note: string;
  thaiNote: string;
}

export const Constellation: React.FC = () => {
  const [activeNode, setActiveNode] = useState<CelestialNode | null>(null);

  const nodes: CelestialNode[] = [
    {
      id: 'bkk',
      name: 'Bangkok (กรุงเทพมหานคร)',
      coords: '13.7563° N, 100.5018° E',
      top: '35%',
      left: '42%',
      note: 'O coração pulsante da Tailândia, onde nossas energias se fundiram sob as luzes da metrópole.',
      thaiNote: 'หัวใจที่เต้นแรงของประเทศไทย ที่ซึ่งพลังงานของเราหลอมรวมกันภายใต้แสงไฟของมหานคร',
    },
    {
      id: 'hkt',
      name: 'Phuket (ภูเก็ต)',
      coords: '7.8804° N, 98.3923° E',
      top: '72%',
      left: '28%',
      note: 'As águas esmeraldas que testemunharam promessas de amor eterno ao som do entardecer.',
      thaiNote: 'น้ำทะเลสีมรกตที่ได้เป็นพยานในคำสัญญาแห่งรักนิรันดร์ท่ามกลางเสียงกระซิบของยามเย็น',
    },
    {
      id: 'cnx',
      name: 'Chiang Mai (เชียงใหม่)',
      coords: '18.7883° N, 98.9853° E',
      top: '18%',
      left: '32%',
      note: 'O refúgio sagrado das montanhas, onde aprendemos a ouvir o silêncio das estrelas.',
      thaiNote: 'สถานที่ศักดิ์สิทธิ์บนภูเขา ที่ซึ่งเราได้เรียนรู้ที่จะฟังความเงียบสงบของดวงดาว',
    },
    {
      id: 'aya',
      name: 'Ayutthaya (อยุธยา)',
      coords: '14.3555° N, 100.5780° E',
      top: '30%',
      left: '45%',
      note: 'A grandiosidade da história refletindo a solidez e a beleza atemporal da nossa união.',
      thaiNote: 'ความยิ่งใหญ่ของประวัติศาสตร์ที่สะท้อนถึงความมั่นคงและความงดงามเหนือกาลเวลาของความรักเรา',
    },
    {
      id: 'kbv',
      name: 'Krabi (กระบี่)',
      coords: '8.0863° N, 98.9063° E',
      top: '68%',
      left: '38%',
      note: 'Falésias majestosas e horizontes infinitos, lembrando que não há limites para nós.',
      thaiNote: 'หน้าผาอันสง่างามและขอบฟ้าที่ไร้จุดสิ้นสุด เตือนใจว่าไม่มีสิ่งใดมาขวางกั้นเราได้',
    },
  ];

  return (
    <section id="constellation" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 text-[#f5e0c3] mb-3">
          <Sparkles className="w-4 h-4 animate-pulse text-[#e8c5b8]" />
          <span className="font-cinzel text-xs tracking-[0.3em] uppercase font-semibold">Geometria Sagrada & Céu Noturno</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-4">
          Constelação <span className="italic font-playfair text-[#f5e0c3]">Tailândia</span>
        </h2>
        <p className="font-sans text-xs md:text-sm text-slate-400 max-w-xl mx-auto tracking-widest uppercase leading-relaxed">
          O alinhamento exato das estrelas sobre o Reino da Tailândia na noite de 19 de Maio. Clique nas estrelas para explorar nossas coordenadas sagradas.
        </p>
      </div>

      {/* Constellation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left / Map Interactive Box */}
        <div className="lg:col-span-7 relative h-[500px] md:h-[600px] glass-panel rounded-3xl overflow-hidden border border-[#f5e0c3]/20 shadow-2xl p-6 flex items-center justify-center group bg-[#020617]/90 backdrop-blur-2xl">
          
          {/* Subtle Grid / Radar lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

          {/* Abstract Constellation Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
            <motion.path
              d="M 42% 35% L 28% 72% L 38% 68% L 45% 30% L 32% 18% Z"
              fill="none"
              stroke="#f5e0c3"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 42% 35% L 32% 18% M 45% 30% L 28% 72%"
              fill="none"
              stroke="#e8c5b8"
              strokeWidth="1"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
            />
          </svg>

          {/* Central Compass Rose / Background Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#f5e0c3]/10 flex items-center justify-center pointer-events-none animate-spin" style={{ animationDuration: '60s' }}>
            <div className="w-64 h-64 rounded-full border border-[#f5e0c3]/15 flex items-center justify-center">
              <Compass className="w-32 h-32 text-[#f5e0c3]/10" />
            </div>
          </div>

          {/* Interactive Celestial Nodes */}
          {nodes.map((node) => {
            const isActive = activeNode?.id === node.id;
            return (
              <div
                key={node.id}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: node.top, left: node.left }}
              >
                <div className="relative flex items-center justify-center group/star cursor-pointer" onClick={() => setActiveNode(node)}>
                  {/* Pulse Effect */}
                  <span className={`absolute -inset-3 rounded-full bg-[#f5e0c3] animate-ping opacity-30 ${isActive ? 'opacity-60 ring-2 ring-[#f5e0c3]' : ''}`} />
                  
                  {/* Star Core */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#f5e0c3] to-[#e8c5b8] text-[#020617] scale-125 shadow-lg shadow-[#f5e0c3]/50'
                      : 'bg-[#0f172a] text-[#f5e0c3] border border-[#f5e0c3]/40 group-hover/star:border-[#f5e0c3] group-hover/star:scale-110'
                  }`}>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>

                  {/* Tooltip Label */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#020617]/90 backdrop-blur-md border border-[#f5e0c3]/30 px-3 py-1 rounded-lg text-[10px] font-mono tracking-wider text-[#f5e0c3] whitespace-nowrap opacity-0 group-hover/star:opacity-100 transition-opacity pointer-events-none shadow-xl">
                    {node.name.split(' ')[0]}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Quick Helper Text */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-[#020617]/80 px-4 py-2 rounded-xl border border-slate-800">
            <Navigation className="w-3.5 h-3.5 text-[#f5e0c3]" />
            <span>SELECIONE UMA ESTRELA PARA DECODIFICAR</span>
          </div>
        </div>

        {/* Right / Info Panel */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel-gold rounded-3xl p-8 md:p-10 border border-[#f5e0c3]/30 shadow-2xl relative overflow-hidden"
              >
                {/* Background watermarks */}
                <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                  <Compass className="w-64 h-64 text-[#f5e0c3]" />
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#f5e0c3] mb-4 bg-[#f5e0c3]/10 px-3 py-1 rounded-full border border-[#f5e0c3]/20 w-fit">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>COORDENADAS CELESTIAIS</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 font-normal">
                  {activeNode.name}
                </h3>

                <p className="font-mono text-xs text-[#f5e0c3]/80 tracking-widest mb-6 border-b border-[#f5e0c3]/15 pb-4">
                  {activeNode.coords}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Memória do Coração</h4>
                    <p className="font-sans text-sm md:text-base text-slate-200 leading-relaxed font-light">
                      {activeNode.note}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f5e0c3]/10">
                    <h4 className="text-[10px] font-mono tracking-widest text-[#f5e0c3]/60 uppercase mb-2">Tradução Tailandesa</h4>
                    <p className="font-thai text-sm md:text-base text-[#e8c5b8] leading-relaxed tracking-wide">
                      {activeNode.thaiNote}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Status: Conectado</span>
                  <span className="text-[#f5e0c3]">Kannika 19.05</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel rounded-3xl p-8 md:p-12 text-center border border-slate-800 flex flex-col items-center justify-center min-h-[350px]"
              >
                <div className="w-16 h-16 rounded-full bg-[#0f172a] border border-[#f5e0c3]/20 flex items-center justify-center text-[#f5e0c3] mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-white mb-3">O Mapa Estelar de Kannika</h3>
                <p className="font-sans text-xs md:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Cada ponto luminoso representa uma parte da nossa história gravada nas terras da Tailândia. Selecione uma estrela no mapa ao lado para desvendar as memórias.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
};
