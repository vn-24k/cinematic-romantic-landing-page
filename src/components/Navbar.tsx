import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Compass,
  BookOpen,
  Calendar,
  Music,
  X,
  Menu,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  sectionId: string;
}

interface NavbarProps {
  isPlaying: boolean;
  onToggleAudio: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'A Revelação',  href: '#hero',          icon: Sparkles, sectionId: 'hero'          },
  { label: 'Memórias',     href: '#memories',      icon: Heart,    sectionId: 'memories'      },
  { label: 'A Carta',      href: '#letter',        icon: BookOpen, sectionId: 'letter'        },
  { label: 'Constelação',  href: '#constellation', icon: Compass,  sectionId: 'constellation' },
  { label: 'Cápsula',      href: '#capsule',       icon: Calendar, sectionId: 'capsule'       },
] as const;

const SCROLL_THRESHOLD = 50;

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrolled(threshold = SCROLL_THRESHOLD) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setScrolled(window.scrollY > threshold);

    // Passive listener para não bloquear o thread principal
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observerCallback =
      (id: string): IntersectionObserverCallback =>
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(id);
        });
      };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(observerCallback(id), {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0,
      });

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return activeSection;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Equalizer animado — 3 barras que pulsam enquanto o áudio toca */
const EqualizerBars: React.FC = () => {
  const bars = [
    { delay: 0,    duration: 0.5  },
    { delay: 0.15, duration: 0.7  },
    { delay: 0.08, duration: 0.55 },
  ];

  return (
    <span className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
      {bars.map(({ delay, duration }, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-[#f5e0c3]"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration,
            delay,
            ease: 'easeInOut',
          }}
          style={{ originY: 1, height: '100%' }}
        />
      ))}
    </span>
  );
};

/** Indicador de ping para áudio ativo */
const PingDot: React.FC = () => (
  <span className="absolute -top-1 -right-1 flex h-2 w-2" aria-hidden="true">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5e0c3] opacity-75" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f5e0c3]" />
  </span>
);

// ─── NavLink ──────────────────────────────────────────────────────────────────

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  item,
  isActive,
  onClick,
  mobile = false,
}) => {
  const Icon = item.icon;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick?.();

      const target = document.getElementById(item.sectionId);
      if (!target) return;

      // Offset pela altura da navbar (~72px)
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    },
    [item.sectionId, onClick],
  );

  if (mobile) {
    return (
      <a
        href={item.href}
        onClick={handleClick}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
          tracking-widest uppercase transition-all duration-300
          ${isActive
            ? 'bg-[#f5e0c3]/10 text-[#f5e0c3] border border-[#f5e0c3]/20'
            : 'text-slate-400 hover:text-[#f5e0c3] hover:bg-white/5 border border-transparent'}
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{item.label}</span>
        {isActive && (
          <motion.span
            layoutId="mobile-active-dot"
            className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f5e0c3]"
          />
        )}
      </a>
    );
  }

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={`
        relative flex items-center gap-2 text-[11px] font-medium tracking-widest
        uppercase py-1 transition-colors duration-300 group
        ${isActive ? 'text-[#f5e0c3]' : 'text-slate-400 hover:text-[#f5e0c3]'}
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon
        className={`w-3.5 h-3.5 transition-all duration-300
          ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}
        aria-hidden="true"
      />
      <span>{item.label}</span>

      {/* Underline ativo */}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-[#f5e0c3]"
        initial={false}
        animate={{ width: isActive ? '100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </a>
  );
};

// ─── AudioButton ──────────────────────────────────────────────────────────────

interface AudioButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const AudioButton: React.FC<AudioButtonProps> = ({ isPlaying, onToggle }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Pausar trilha sonora' : 'Ouvir trilha sonora'}
      aria-pressed={isPlaying}
      className={`
        flex items-center gap-2.5 px-4 py-2 rounded-full border
        backdrop-blur-md transition-all duration-300 group shadow-lg
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5e0c3]/50
        ${isPlaying
          ? 'border-[#f5e0c3]/40 bg-[#f5e0c3]/5 hover:bg-[#f5e0c3]/10'
          : 'border-[#f5e0c3]/20 bg-[#0f172a]/60 hover:border-[#f5e0c3]/60 hover:bg-[#0f172a]'}
      `}
    >
      {/* Ícone / Equalizer */}
      <div className="relative flex items-center justify-center w-5 h-5">
        {isPlaying && !shouldReduceMotion ? (
          <EqualizerBars />
        ) : (
          <Music
            className="w-3.5 h-3.5 text-[#f5e0c3]"
            aria-hidden="true"
          />
        )}
        {isPlaying && <PingDot />}
      </div>

      {/* Label */}
      <span className="text-[11px] font-mono tracking-wider text-slate-300 group-hover:text-white transition-colors select-none">
        {isPlaying ? 'ÁUDIO ATIVO' : 'TRILHA SONORA'}
      </span>
    </button>
  );
};

// ─── MobileDrawer ─────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  isPlaying: boolean;
  onToggleAudio: () => void;
}

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  isPlaying,
  onToggleAudio,
}) => {
  // Fechar com Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] bg-[#020617]/95 backdrop-blur-xl border-l border-[#f5e0c3]/10 flex flex-col md:hidden"
          >
            {/* Header do drawer */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#f5e0c3]/10">
              <span className="font-cinzel text-sm font-semibold tracking-[0.2em] text-slate-200">
                KANNIKA
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar menu"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5e0c3]/50"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.sectionId}
                  item={item}
                  isActive={activeSection === item.sectionId}
                  onClick={onClose}
                  mobile
                />
              ))}
            </nav>

            {/* Footer do drawer */}
            <div className="px-4 py-5 border-t border-[#f5e0c3]/10">
              <AudioButton isPlaying={isPlaying} onToggle={onToggleAudio} />
              <p className="mt-3 text-center text-[10px] font-mono tracking-widest text-slate-600 uppercase">
                19 de Maio • Elite Edition
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const Navbar: React.FC<NavbarProps> = ({ isPlaying, onToggleAudio }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();

  const sectionIds = useMemo(
    () => NAV_ITEMS.map((item) => item.sectionId),
    [],
  );

  const activeSection = useActiveSection(sectionIds);

  const openMobile  = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-[#020617]/80 backdrop-blur-md border-b border-[#f5e0c3]/10 py-3 shadow-2xl shadow-black/50'
            : 'bg-transparent py-5'}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-6">

          {/* ── Brand / Monogram ── */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group shrink-0"
            aria-label="Voltar ao topo — Kannika"
          >
            <div className="relative w-10 h-10 rounded-full border border-[#f5e0c3]/30 flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-sm group-hover:border-[#f5e0c3]/70 transition-colors duration-500 shadow-inner">
              <span className="font-cinzel font-bold text-lg text-[#f5e0c3] group-hover:scale-105 transition-transform tracking-wider select-none">
                K
              </span>
              <span
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#f5e0c3]/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-cinzel text-sm font-semibold tracking-[0.25em] text-slate-200 group-hover:text-[#f5e0c3] transition-colors">
                KANNIKA
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#f5e0c3]/60 uppercase">
                19 de Maio · Elite Edition
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Navegação principal"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.sectionId}
                item={item}
                isActive={activeSection === item.sectionId}
              />
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio button — visível em todos os tamanhos */}
            <AudioButton isPlaying={isPlaying} onToggle={onToggleAudio} />

            {/* Hamburger — apenas mobile */}
            <button
              type="button"
              onClick={openMobile}
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5e0c3]/50"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={closeMobile}
        activeSection={activeSection}
        isPlaying={isPlaying}
        onToggleAudio={onToggleAudio}
      />
    </>
  );
};
