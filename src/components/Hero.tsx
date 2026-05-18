import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  memo,
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TitleSlide {
  key: string;
  content: React.ReactNode;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BIRTHDAY_MONTH = 4; // 0-indexed (May)
const BIRTHDAY_DAY   = 19;
const TITLE_INTERVAL = 5_000;
const PARTICLE_COLORS = ['#f5e0c3', '#e8c5b8', '#ffffff', '#cbd5e1'] as const;

// ─── Canvas Particle Engine ───────────────────────────────────────────────────

class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  pulseSpeed: number;
  pulseDir: number;

  constructor(width: number, height: number) {
    this.x          = Math.random() * width;
    this.y          = Math.random() * height;
    this.radius     = Math.random() * 2 + 0.4;
    this.color      = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    this.vx         = (Math.random() - 0.5) * 0.28;
    this.vy         = (Math.random() - 0.5) * 0.28 - 0.08;
    this.alpha      = Math.random() * 0.6 + 0.3;
    this.pulseSpeed = Math.random() * 0.018 + 0.004;
    this.pulseDir   = 1;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0)      this.x = width;
    if (this.x > width)  this.x = 0;
    if (this.y < 0)      this.y = height;
    if (this.y > height) this.y = 0;

    this.alpha += this.pulseSpeed * this.pulseDir;
    if (this.alpha >= 1)   this.pulseDir = -1;
    if (this.alpha <= 0.2) this.pulseDir =  1;
    this.alpha = Math.max(0.1, Math.min(1, this.alpha));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle   = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.shadowBlur  = 8;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur  = 0;
  }
}

const StarCanvas: React.FC = memo(() => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef<{
    raf: number;
    particles: Particle[];
    paused: boolean;
  }>({ raf: 0, particles: [], paused: false });

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return; // Respeita preferência do sistema

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let cssW = window.innerWidth;
    let cssH = window.innerHeight;

    const setSize = () => {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas.width  = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width  = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    // Criar partículas baseado na resolução
    const count = Math.min(cssW > 768 ? 130 : 65, 160);
    stateRef.current.particles = Array.from(
      { length: count },
      () => new Particle(cssW, cssH),
    );

    // Radial gradient de fundo — criado UMA vez e reutilizado
    const getBg = () => {
      const g = ctx.createRadialGradient(
        cssW / 2, cssH / 2, 80,
        cssW / 2, cssH / 2, Math.hypot(cssW, cssH) / 1.6,
      );
      g.addColorStop(0, 'rgba(15,23,42,0.35)');
      g.addColorStop(1, 'rgba(2,6,23,0.96)');
      return g;
    };
    let bg = getBg();

    const render = () => {
      if (stateRef.current.paused) return;

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cssW, cssH);

      stateRef.current.particles.forEach((p) => {
        p.update(cssW, cssH);
        p.draw(ctx);
      });

      stateRef.current.raf = requestAnimationFrame(render);
    };

    // ResizeObserver — mais preciso que window resize
    const ro = new ResizeObserver(() => {
      setSize();
      bg = getBg(); // Recria gradient no novo tamanho
      stateRef.current.particles = Array.from(
        { length: count },
        () => new Particle(cssW, cssH),
      );
    });
    ro.observe(document.documentElement);

    // Pausar quando a aba fica oculta — economiza CPU/bateria
    const onVisibility = () => {
      stateRef.current.paused = document.hidden;
      if (!document.hidden) render();
    };
    document.addEventListener('visibilitychange', onVisibility);

    render();

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
});
StarCanvas.displayName = 'StarCanvas';

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useCountdown(month: number, day: number): TimeLeft {
  const getTarget = useCallback((): Date => {
    const now  = new Date();
    const year = now.getFullYear();
    const t    = new Date(year, month, day);
    return now > t ? new Date(year + 1, month, day) : t;
  }, [month, day]);

  const compute = useCallback((): TimeLeft => {
    const diff = getTarget().getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000)    % 60),
      seconds: Math.floor((diff / 1_000)     % 60),
    };
  }, [getTarget]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(compute);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(compute()), 1_000);
    return () => clearInterval(id);
  }, [compute]);

  return timeLeft;
}

function useCycling(length: number, interval: number): number {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return; // Sem ciclo se motion reduzido
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % length),
      interval,
    );
    return () => clearInterval(id);
  }, [length, interval, shouldReduceMotion]);

  return index;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Número animado com flip individual por dígito */
const FlipDigit: React.FC<{ digit: string }> = memo(({ digit }) => (
  <AnimatePresence mode="popLayout">
    <motion.span
      key={digit}
      initial={{ y: -24, opacity: 0, rotateX: -45 }}
      animate={{ y: 0,   opacity: 1, rotateX: 0   }}
      exit={{   y:  24,  opacity: 0, rotateX:  45  }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block tabular-nums"
      style={{ willChange: 'transform, opacity' }}
    >
      {digit}
    </motion.span>
  </AnimatePresence>
));
FlipDigit.displayName = 'FlipDigit';

interface CountdownUnitProps {
  label: string;
  value: number;
}

const CountdownUnit: React.FC<CountdownUnitProps> = memo(({ label, value }) => {
  const padded = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center bg-[#020617]/50 rounded-xl p-3 md:p-4 border border-[#f5e0c3]/10 hover:border-[#f5e0c3]/25 transition-colors duration-500 shadow-inner">
      <span
        className="font-cinzel text-2xl md:text-4xl font-bold text-white tracking-wider overflow-hidden flex"
        aria-label={`${value} ${label.toLowerCase()}`}
      >
        <FlipDigit digit={padded[0]} />
        <FlipDigit digit={padded[1]} />
      </span>
      <span className="text-[9px] md:text-[11px] font-mono tracking-[0.2em] text-slate-400 mt-1 uppercase select-none">
        {label}
      </span>
    </div>
  );
});
CountdownUnit.displayName = 'CountdownUnit';

/** Countdown container */
const CountdownPanel: React.FC<{ timeLeft: TimeLeft }> = memo(({ timeLeft }) => {
  const units = useMemo(
    () => [
      { label: 'DIAS',     value: timeLeft.days    },
      { label: 'HORAS',    value: timeLeft.hours   },
      { label: 'MINUTOS',  value: timeLeft.minutes },
      { label: 'SEGUNDOS', value: timeLeft.seconds },
    ],
    [timeLeft],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      role="timer"
      aria-label="Contagem regressiva para 19 de Maio"
      className="mt-12 md:mt-16 w-full max-w-xl mx-auto relative overflow-hidden rounded-2xl
                 bg-[#0f172a]/60 backdrop-blur-xl border border-[#f5e0c3]/10 shadow-2xl shadow-black/60 p-6 md:p-8"
    >
      {/* Top shimmer line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f5e0c3]/50 to-transparent"
      />

      <div className="flex items-center justify-center gap-2 mb-6 text-[#f5e0c3]">
        <Heart className="w-4 h-4 text-[#e8c5b8]" aria-hidden="true" />
        <span className="font-cinzel text-xs tracking-[0.3em] uppercase font-semibold select-none">
          Contagem Regressiva para 19 de Maio
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-6 text-center">
        {units.map((u) => (
          <CountdownUnit key={u.label} label={u.label} value={u.value} />
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-500 font-mono tracking-wider">
        <span>LOCAL: GLOBAL / THAILAND</span>
        <span className="text-[#f5e0c3]/70">STATUS: TRANSCENDENTAL</span>
      </div>

      {/* Bottom shimmer line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f5e0c3]/20 to-transparent"
      />
    </motion.div>
  );
});
CountdownPanel.displayName = 'CountdownPanel';

/** Scroll indicator */
const ScrollIndicator: React.FC = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('memories');
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 72,
      behavior: 'smooth',
    });
  }, []);

  return (
    <motion.a
      href="#memories"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.2 }}
      aria-label="Explorar memórias — rolar para baixo"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                 text-slate-400 hover:text-[#f5e0c3] transition-colors duration-300 group
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5e0c3]/50 rounded"
    >
      <span className="text-[10px] font-mono tracking-[0.4em] uppercase opacity-60 group-hover:opacity-100 transition-opacity select-none">
        EXPLORAR MEMÓRIAS
      </span>

      <div className="w-6 h-10 rounded-full border border-slate-600 group-hover:border-[#f5e0c3]/70
                      flex items-start justify-center p-1 transition-colors duration-300">
        <motion.div
          className="w-1.5 h-2 bg-[#f5e0c3] rounded-full"
          animate={shouldReduceMotion ? {} : { y: [0, 16, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </div>

      <ChevronDown
        className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
    </motion.a>
  );
});
ScrollIndicator.displayName = 'ScrollIndicator';

// ─── Title Slides ─────────────────────────────────────────────────────────────

const slideVariants = {
  enter: { opacity: 0, y: 22,  scale: 0.985 },
  center:{ opacity: 1, y: 0,   scale: 1     },
  exit:  { opacity: 0, y: -22, scale: 0.985 },
};

const SLIDES: TitleSlide[] = [
  {
    key: 'thai',
    content: (
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-thai text-5xl md:text-7xl lg:text-8xl font-light tracking-wide
                        text-transparent bg-clip-text bg-gradient-to-r from-[#f5e0c3] via-white to-[#e8c5b8]
                        drop-shadow-2xl leading-tight">
          สุขสันต์วันเกิด, Kannika
        </h1>
        <p className="font-cinzel tracking-[0.4em] text-xs md:text-sm text-[#f5e0c3]/70 uppercase">
          Feliz Aniversário, Meu Amor
        </p>
      </div>
    ),
  },
  {
    key: 'portuguese',
    content: (
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight
                        text-white drop-shadow-2xl leading-snug">
          Para aquela que{' '}
          <em className="not-italic font-playfair text-[#f5e0c3]">ilumina</em>{' '}
          o meu mundo.
        </h1>
        <p className="font-mono tracking-[0.3em] text-xs text-slate-400 uppercase">
          19 de Maio • O Dia em que o Universo Sorriu
        </p>
      </div>
    ),
  },
  {
    key: 'celebration',
    content: (
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider
                        text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5e0c3] to-white
                        drop-shadow-2xl">
          KANNIKA 19.05
        </h1>
        <p className="font-sans font-light tracking-widest text-sm text-[#f5e0c3]/80 max-w-md mx-auto leading-relaxed">
          Uma experiência digital imersiva dedicada à nossa história e ao seu brilho atemporal.
        </p>
      </div>
    ),
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const Hero: React.FC = () => {
  const timeLeft    = useCountdown(BIRTHDAY_MONTH, BIRTHDAY_DAY);
  const titleStage  = useCycling(SLIDES.length, TITLE_INTERVAL);

  return (
    <section
      id="hero"
      aria-label="Seção principal — Celebração de aniversário de Kannika"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]"
    >
      {/* ── Canvas background ── */}
      <StarCanvas />

      {/* ── Ambient glow ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[500px] h-[500px] rounded-full pointer-events-none z-0
                   bg-gradient-to-tr from-[#f5e0c3]/10 to-[#e8c5b8]/5 blur-[120px]"
        style={{
          animation: 'pulse 8s ease-in-out infinite',
          willChange: 'opacity',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-16 md:pt-0">

        {/* Elite badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                     bg-[#0f172a]/80 border border-[#f5e0c3]/30 backdrop-blur-md
                     mb-8 shadow-xl shadow-black/40"
        >
          <Sparkles
            className="w-3.5 h-3.5 text-[#f5e0c3]"
            aria-hidden="true"
            style={{ animation: 'spin 6s linear infinite' }}
          />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#f5e0c3]/90 font-semibold select-none">
            Uma Celebração Cinematográfica
          </span>
        </motion.div>

        {/* Title carousel */}
        <div
          className="h-44 md:h-52 flex items-center justify-center w-full my-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={SLIDES[titleStage].key}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
              style={{ willChange: 'transform, opacity' }}
            >
              {SLIDES[titleStage].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Countdown */}
        <CountdownPanel timeLeft={timeLeft} />
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
};
