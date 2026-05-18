import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [titleStage, setTitleStage] = useState<number>(0);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Target date: May 19, 2026 (or next May 19th)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      let target = new Date(targetYear, 4, 19); // Month is 0-indexed (4 = May)

      if (now.getTime() > target.getTime()) {
        target = new Date(targetYear + 1, 4, 19);
      }

      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Custom Stardust / Fireflies Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Setup
    const particleCount = Math.min(window.innerWidth > 768 ? 120 : 60, 150);
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      pulseSpeed: number;
    }> = [];

    const colors = ['#f5e0c3', '#e8c5b8', '#ffffff', '#cbd5e1'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1, // Slight upward drift
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background gradient glow
      const grad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, Math.max(width, height) / 1.5);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
      grad.addColorStop(1, 'rgba(2, 6, 23, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update & Draw Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.alpha += p.pulseSpeed;
        if (p.alpha > 1 || p.alpha < 0.2) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Title morphing timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleStage((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#f5e0c3]/10 to-[#e8c5b8]/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-16 md:pt-0">
        
        {/* Elite Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f172a]/80 border border-[#f5e0c3]/30 backdrop-blur-md mb-8 shadow-xl shadow-black/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f5e0c3] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#f5e0c3]/90 font-semibold">
            Uma Celebração Cinematográfica
          </span>
        </motion.div>

        {/* Elegant Typography Reveal */}
        <div className="h-40 md:h-48 flex items-center justify-center w-full my-2">
          <AnimatePresence mode="wait">
            {titleStage === 0 && (
              <motion.div
                key="thai"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4"
              >
                <h1 className="font-thai text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#f5e0c3] via-white to-[#e8c5b8] drop-shadow-2xl">
                  สุขสันต์วันเกิด, Kannika
                </h1>
                <p className="font-cinzel tracking-[0.4em] text-xs md:text-sm text-[#f5e0c3]/70 uppercase">
                  Feliz Aniversário, Meu Amor
                </p>
              </motion.div>
            )}

            {titleStage === 1 && (
              <motion.div
                key="portuguese"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4"
              >
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white drop-shadow-2xl">
                  Para aquela que <span className="italic font-playfair text-[#f5e0c3]">ilumina</span> o meu mundo.
                </h1>
                <p className="font-mono tracking-[0.3em] text-xs text-slate-400 uppercase">
                  19 de Maio • O Dia em que o Universo Sorriu
                </p>
              </motion.div>
            )}

            {titleStage === 2 && (
              <motion.div
                key="celebration"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4"
              >
                <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5e0c3] to-white drop-shadow-2xl">
                  KANNIKA 19.05
                </h1>
                <p className="font-sans font-light tracking-widest text-sm text-[#f5e0c3]/80 max-w-md mx-auto">
                  Uma experiência digital imersiva dedicada à nossa história e ao seu brilho atemporal.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimalist Elegant Real-Time Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 md:mt-16 w-full max-w-xl mx-auto glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#f5e0c3]/50 to-transparent" />
          
          <div className="flex items-center justify-center gap-2 mb-6 text-[#f5e0c3]">
            <Heart className="w-4 h-4 animate-pulse text-[#e8c5b8]" />
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase font-semibold">Contagem Regressiva para 19 de Maio</span>
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-6 text-center">
            {[
              { label: 'DIAS', value: timeLeft.days },
              { label: 'HORAS', value: timeLeft.hours },
              { label: 'MINUTOS', value: timeLeft.minutes },
              { label: 'SEGUNDOS', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center bg-[#020617]/50 rounded-xl p-3 md:p-4 border border-[#f5e0c3]/10 shadow-inner group-hover:border-[#f5e0c3]/20 transition-colors">
                <span className="font-cinzel text-2xl md:text-4xl font-bold text-white tracking-wider animate-shimmer">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] md:text-xs font-mono tracking-[0.2em] text-slate-400 mt-1 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono tracking-wider">
            <span>LOCAL: GLOBAL / THAILAND</span>
            <span className="text-[#f5e0c3]">STATUS: TRANSCENDENTAL</span>
          </div>
        </motion.div>

        {/* Floating Minimalist Scroll Down Indicator */}
        <motion.a
          href="#memories"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-[#f5e0c3] transition-colors duration-300 group"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            EXPLORAR MEMÓRIAS
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-slate-600 group-hover:border-[#f5e0c3] flex items-start justify-center p-1 transition-colors"
          >
            <motion.div className="w-1.5 h-2 bg-[#f5e0c3] rounded-full" />
          </motion.div>
          <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </motion.a>

      </div>
    </section>
  );
};
