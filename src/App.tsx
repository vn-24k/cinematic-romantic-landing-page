// ─── App.tsx ─────────────────────────────────────────────────────────────────
import React, {
  lazy,
  Suspense,
  memo,
  useCallback,
} from 'react';
import { ErrorBoundary }  from './components/ErrorBoundary';
import { AppProvider, useApp } from './context/AppContext';
import { Footer } from './components/Footer';

// ── Lazy imports — code splitting por seção ──────────────────────────────────
const Navbar        = lazy(() => import('./components/Navbar')       .then((m) => ({ default: m.Navbar        })));
const Hero          = lazy(() => import('./components/Hero')         .then((m) => ({ default: m.Hero          })));
const BentoGrid     = lazy(() => import('./components/BentoGrid')    .then((m) => ({ default: m.BentoGrid     })));
const BilingualLetter = lazy(() => import('./components/BilingualLetter').then((m) => ({ default: m.BilingualLetter })));
const Constellation = lazy(() => import('./components/Constellation').then((m) => ({ default: m.Constellation })));
const LoveTimeline  = lazy(() => import('./components/LoveTimeline') .then((m) => ({ default: m.LoveTimeline  })));
const TimeCapsule   = lazy(() => import('./components/TimeCapsule')  .then((m) => ({ default: m.TimeCapsule   })));
const AudioWidget   = lazy(() => import('./components/AudioWidget')  .then((m) => ({ default: m.AudioWidget   })));
const MemoryModal   = lazy(() => import('./components/MemoryModal')  .then((m) => ({ default: m.MemoryModal   })));

// ── Section fallback skeleton ────────────────────────────────────────────────
const SectionSkeleton: React.FC<{ height?: string }> = memo(({ height = 'h-64' }) => (
  <div
    aria-hidden="true"
    className={`w-full ${height} animate-pulse bg-gradient-to-r
                from-[#0f172a] via-[#1e293b]/50 to-[#0f172a]
                bg-[length:200%_100%]`}
    style={{ animation: 'shimmerBg 2s linear infinite' }}
  />
));
SectionSkeleton.displayName = 'SectionSkeleton';

// ── Inner app — consomem context ─────────────────────────────────────────────
const AppContent: React.FC = memo(() => {
  const { isPlaying, selectedMemory, toggleAudio, selectMemory } = useApp();
  const closeModal = useCallback(() => selectMemory(null), [selectMemory]);

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-100 font-sans
                 relative overflow-x-hidden"
    >
      {/* ── Skip navigation — acessibilidade / screen readers ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
                   focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#f5e0c3] focus:text-[#020617]
                   focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase
                   focus:font-bold focus:shadow-xl"
      >
        Pular para o conteúdo
      </a>

      {/* ── Navbar ── */}
      <Suspense fallback={null}>
        <Navbar isPlaying={isPlaying} onToggleAudio={toggleAudio} />
      </Suspense>

      {/* ── Main content ── */}
      <main id="main-content" tabIndex={-1}>

        <Suspense fallback={<SectionSkeleton height="h-screen" />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
          <BentoGrid onSelectMemory={selectMemory} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-[500px]" />}>
          <BilingualLetter />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
          <Constellation />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-[500px]" />}>
          <LoveTimeline />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-[400px]" />}>
          <TimeCapsule />
        </Suspense>

      </main>

      {/* ── Floating widgets (lazy, sem skeleton) ── */}
      <Suspense fallback={null}>
        <AudioWidget isPlaying={isPlaying} onTogglePlay={toggleAudio} />
      </Suspense>

      {/* ── Modal (lazy, only mounts when needed) ── */}
      {selectedMemory && (
        <Suspense fallback={null}>
          <MemoryModal memory={selectedMemory} onClose={closeModal} />
        </Suspense>
      )}

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
});
AppContent.displayName = 'AppContent';

// ── Root ─────────────────────────────────────────────────────────────────────
export const App: React.FC = () => (
  <ErrorBoundary>
    <AppProvider>
      <AppContent />
    </AppProvider>
  </ErrorBoundary>
);

export default App;
