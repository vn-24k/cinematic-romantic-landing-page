import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Sparkles, Lock, Calendar } from 'lucide-react';

export const TimeCapsule: React.FC = () => {
  const [author, setAuthor] = useState('');
  const [targetYear, setTargetYear] = useState('2027');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="capsule" className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 text-[#f5e0c3] mb-3">
          <Sparkles className="w-4 h-4 animate-pulse text-[#e8c5b8]" />
          <span className="font-cinzel text-xs tracking-[0.3em] uppercase font-semibold">Cápsula do Tempo Sagrada</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-4">
          Deixe um <span className="italic font-playfair text-[#f5e0c3]">Desejo</span> para o Futuro
        </h2>
        <p className="font-sans text-xs md:text-sm text-slate-400 max-w-lg mx-auto tracking-widest uppercase leading-relaxed">
          Grave uma mensagem atemporal que permanecerá selada nas estrelas até o aniversário escolhido.
        </p>
      </div>

      {/* Glassmorphism Capsule Box */}
      <div className="glass-panel-gold rounded-3xl p-8 md:p-14 border border-[#f5e0c3]/30 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Background Icon */}
        <Lock className="absolute -right-12 -bottom-12 w-64 h-64 text-[#f5e0c3]/5 pointer-events-none transform -rotate-12" />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 md:space-y-8 relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono tracking-widest uppercase text-slate-300 mb-2">
                    Seu Nome / Autor
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Ex: Kannika ou Seu Amor"
                    className="w-full px-5 py-3.5 rounded-xl glass-input text-white font-sans text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#f5e0c3] transition-colors shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-widest uppercase text-slate-300 mb-2">
                    Ano de Abertura da Cápsula
                  </label>
                  <div className="relative">
                    <select
                      value={targetYear}
                      onChange={(e) => setTargetYear(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl glass-input text-white font-sans text-sm appearance-none focus:outline-none focus:border-[#f5e0c3] transition-colors shadow-inner bg-[#0f172a]/80"
                    >
                      <option value="2027">19 de Maio de 2027 (Próximo Ano)</option>
                      <option value="2028">19 de Maio de 2028 (2 Anos)</option>
                      <option value="2030">19 de Maio de 2030 (Futuro Próximo)</option>
                      <option value="2036">19 de Maio de 2036 (10 Anos)</option>
                    </select>
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f5e0c3]/60 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-slate-300 mb-2">
                  Mensagem / Promessa para o Futuro
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva as palavras que você deseja ler quando este dia chegar no futuro..."
                  className="w-full px-5 py-4 rounded-xl glass-input text-white font-sans text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#f5e0c3] transition-colors shadow-inner resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#f5e0c3]" /> Criptografia de Elite Ativada
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#f5e0c3] to-[#e8c5b8] text-[#020617] font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all duration-300 shadow-xl shadow-[#f5e0c3]/20 disabled:opacity-50 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" /> Selando Cápsula...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Selar Cápsula do Tempo
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6 relative z-10"
            >
              <div className="w-20 h-20 rounded-full bg-[#f5e0c3]/20 border border-[#f5e0c3] flex items-center justify-center mx-auto text-[#f5e0c3] animate-bounce" style={{ animationDuration: '2s' }}>
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="font-serif text-3xl md:text-4xl text-white font-normal">
                Cápsula Selada com <span className="italic font-playfair text-[#f5e0c3]">Sucesso</span>
              </h3>

              <p className="font-sans text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                Sua mensagem foi criptografada nas estrelas e programada para ser revelada a Kannika no dia <span className="text-[#f5e0c3] font-bold">19 de Maio de {targetYear}</span>. O amor transcende o tempo.
              </p>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setAuthor('');
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#f5e0c3]/30 text-xs font-mono text-[#f5e0c3] hover:bg-[#f5e0c3] hover:text-[#020617] transition-all duration-300 uppercase tracking-widest"
                >
                  Criar Nova Cápsula
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
};
