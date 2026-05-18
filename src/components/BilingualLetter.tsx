import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Heart, Quote } from 'lucide-react';

export const BilingualLetter: React.FC = () => {
  const [lang, setLang] = useState<'pt' | 'th'>('pt');

  const content = {
    pt: {
      greeting: "Minha amada Kannika,",
      body1: "Hoje, no dia 19 de maio, o universo celebra o instante sagrado em que a sua luz passou a existir. Escrevo estas palavras não apenas para parabenizá-la, mas para agradecer pela honra indescritível de compartilhar a vida com você.",
      body2: "Desde o nosso primeiro olhar, você trouxe uma serenidade que acalmou todas as minhas tempestades e uma paixão que despertou os meus melhores sonhos. Sua presença na Tailândia, com toda a sua riqueza cultural e doçura, transformou a minha forma de ver o mundo.",
      body3: "Cada sorriso seu é um porto seguro; cada toque, uma melodia inesquecível. Prometo amá-la em todas as estações, respeitar seus silêncios e comemorar cada uma de suas vitórias.",
      body4: "Que este novo ciclo seja repleto de paz, saúde e conquistas grandiosas. Você é, e sempre será, aquela que ilumina o meu mundo.",
      sign: "Com todo o meu amor, hoje e para a eternidade.",
      title: "Uma Declaração Atemporal",
      subtitle: "Escrita com a alma, transcendo fronteiras e idiomas.",
      fontClass: "font-serif leading-relaxed text-slate-200 text-lg md:text-xl",
    },
    th: {
      greeting: "กรรณิการ์ที่รักของฉัน,",
      body1: "วันนี้ วันที่ 19 พฤษภาคม จักรวาลร่วมเฉลิมฉลองช่วงเวลาอันศักดิ์สิทธิ์ที่แสงสว่างของคุณได้ถือกำเนิดขึ้น ฉันเขียนถ้อยคำเหล่านี้ไม่เพียงเพื่ออวยพรวันเกิด แต่เพื่อขอบคุณสำหรับเกียรติอันหาที่สุดมิได้ที่ได้ร่วมใช้ชีวิตเคียงข้างคุณ",
      body2: "ตั้งแต่แรกที่เราสบตากัน คุณได้นำพาความสงบสุขที่ช่วยพัดพาพายุในใจฉันให้สงบลง และมอบความหลงใหลที่ปลุกความฝันที่ดีที่สุดของฉันให้ตื่นขึ้น การปรากฏตัวของคุณในประเทศไทย พร้อมด้วยความงดงามทางวัฒนธรรมและความอ่อนโยนของคุณ ได้เปลี่ยนมุมมองที่ฉันมีต่อโลกใบนี้ไปอย่างสิ้นเชิง",
      body3: "ทุกรอยยิ้มของคุณคือที่พักพิงอันอบอุ่น ทุกสัมผัสคือท่วงทำนองที่ไม่อาจลืมเลือน ฉันสัญญาว่าจะรักคุณในทุกฤดูกาล เคารพในความเงียบสงบของคุณ และร่วมยินดีกับทุกชัยชนะของคุณ",
      body4: "ขอให้ปีใหม่ในชีวิตของคุณเต็มไปด้วยความสงบสุข สุขภาพที่แข็งแรง และความสำเร็จอันยิ่งใหญ่ คุณคือและจะเป็นคนที่ส่องสว่างโลกของฉันตลอดไป",
      sign: "ด้วยรักทั้งหมดของหัวใจ วันนี้และตราบชั่วนิรันดร์",
      title: "คำสารภาพรักเหนือกาลเวลา",
      subtitle: "เขียนด้วยจิตวิญญาณ ก้าวข้ามพรมแดนและภาษา",
      fontClass: "font-thai leading-[2.4] text-[#f5e0c3] text-xl md:text-2xl tracking-wide",
    }
  };

  const current = content[lang];

  return (
    <section id="letter" className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
      
      {/* Floating Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#f5e0c3]/10 via-[#e8c5b8]/5 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 text-[#f5e0c3] mb-3">
          <Sparkles className="w-4 h-4 animate-pulse text-[#e8c5b8]" />
          <span className="font-cinzel text-xs tracking-[0.3em] uppercase font-semibold">Carta Interativa Bilíngue</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-4">
          A <span className="italic font-playfair text-[#f5e0c3]">Carta</span> de Aniversário
        </h2>
        <p className="font-sans text-xs md:text-sm text-slate-400 max-w-md mx-auto tracking-widest uppercase">
          {lang === 'pt' ? content.pt.subtitle : content.th.subtitle}
        </p>
      </div>

      {/* Premium Glassmorphism Letter Container */}
      <div className="relative z-10 glass-panel-gold rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden border border-[#f5e0c3]/30">
        
        {/* Subtle Corner Accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#f5e0c3]/30 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#f5e0c3]/30 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#f5e0c3]/30 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#f5e0c3]/30 rounded-br-lg pointer-events-none" />

        {/* Floating Toggle Switch: [ PT-BR / ไทย ] */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#020617]/80 backdrop-blur-xl border border-[#f5e0c3]/30 shadow-2xl">
            <button
              onClick={() => setLang('pt')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-500 ${
                lang === 'pt'
                  ? 'bg-gradient-to-r from-[#f5e0c3] to-[#e8c5b8] text-[#020617] font-bold shadow-lg shadow-[#f5e0c3]/20 scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> PT-BR
            </button>
            <button
              onClick={() => setLang('th')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-500 ${
                lang === 'th'
                  ? 'bg-gradient-to-r from-[#f5e0c3] to-[#e8c5b8] text-[#020617] font-bold shadow-lg shadow-[#f5e0c3]/20 scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> ไทย (Thai)
            </button>
          </div>
        </div>

        {/* Decorative Watermark / Quote Icon */}
        <Quote className="absolute top-12 right-12 w-32 h-32 text-[#f5e0c3]/5 pointer-events-none transform rotate-12" />

        {/* Smooth Text-Morphing Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`space-y-6 md:space-y-8 ${current.fontClass}`}
          >
            <p className="font-semibold text-[#f5e0c3] text-2xl md:text-3xl mb-8 border-b border-[#f5e0c3]/20 pb-4 inline-block">
              {current.greeting}
            </p>
            <p>{current.body1}</p>
            <p>{current.body2}</p>
            <p>{current.body3}</p>
            <p>{current.body4}</p>
            
            <div className="pt-12 mt-12 border-t border-[#f5e0c3]/20 flex flex-col items-end text-right">
              <p className="font-cinzel italic text-[#f5e0c3] text-xl md:text-2xl mb-2">
                {current.sign}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="h-[1px] w-12 bg-[#f5e0c3]/50" />
                <span className="font-cinzel text-xs tracking-[0.4em] uppercase text-slate-400">Seu Amor</span>
                <Heart className="w-4 h-4 text-[#e8c5b8] fill-[#e8c5b8] animate-pulse" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Bottom Subtext */}
      <div className="text-center mt-8 text-xs font-mono text-slate-500 tracking-widest uppercase">
        <span>Documento Criptografado no Coração • 19 de Maio de 2026</span>
      </div>

    </section>
  );
};
