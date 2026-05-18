import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Disc, Volume2, VolumeX, Music, SkipForward } from 'lucide-react';

interface AudioWidgetProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioWidget: React.FC<AudioWidgetProps> = ({ isPlaying, onTogglePlay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = [
    {
      title: 'Our Song - Acoustic Lofi',
      artist: 'Kannika Soundtrack',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf7f6.mp3?filename=lofi-study-112191.mp3',
    },
    {
      title: 'Bangkok Sunset Serenade',
      artist: 'Elite Romantic Vibes',
      url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=cinematic-time-lapse-115652.mp3',
    },
    {
      title: 'Starlight Whisper - Ambient',
      artist: 'Celestial Dream',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b817578b.mp3?filename=meditation-relaxing-music-115320.mp3',
    },
    {
      title: 'Eternity - Piano Dream',
      artist: 'Memories of Thailand',
      url: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_24a2f8b502.mp3?filename=piano-moment-9835.mp3',
    },
  ];

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay policy prevented playback, pause state
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop
        onEnded={() => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)}
      />

      {/* Floating Sticky Widget */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-4 w-80 glass-panel-gold rounded-3xl p-6 border border-[#f5e0c3]/30 shadow-2xl shadow-black/80 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#f5e0c3]/15 pb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#f5e0c3] flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" /> Trilha Sonora de Elite
                </span>
                <span className="text-[10px] font-mono text-slate-400">Kannika 19.05</span>
              </div>

              {/* Current Track Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-full bg-[#020617] border border-[#f5e0c3]/40 flex items-center justify-center shadow-lg overflow-hidden ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
                  <Disc className="w-8 h-8 text-[#f5e0c3]" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-serif text-white text-sm font-normal truncate">
                    {currentTrack.title}
                  </h4>
                  <p className="font-sans text-xs text-slate-400 truncate mt-0.5">
                    {currentTrack.artist}
                  </p>
                  
                  {/* Pulsing Audio Waves simulation */}
                  <div className="flex items-center gap-1 mt-2 h-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((wave) => (
                      <span
                        key={wave}
                        className={`w-1 bg-[#f5e0c3] rounded-full transition-all duration-300 ${
                          isPlaying ? 'animate-pulse' : 'h-1'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.random() * 100 + 20}%` : '4px',
                          animationDelay: `${wave * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tracklist selection */}
              <div className="space-y-2 mb-6 max-h-36 overflow-y-auto pr-1">
                {tracks.map((track, idx) => (
                  <button
                    key={track.title}
                    onClick={() => setCurrentTrackIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-sans transition-all flex items-center justify-between group ${
                      currentTrackIndex === idx
                        ? 'bg-[#f5e0c3]/15 text-[#f5e0c3] border border-[#f5e0c3]/30 font-medium'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-2">{track.title}</span>
                    {currentTrackIndex === idx && isPlaying && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5e0c3] animate-ping" />
                    )}
                  </button>
                ))}
              </div>

              {/* Controls Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={handleToggleMute}
                  className="p-2 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title={isMuted ? "Desmutar" : "Mutar"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#e8c5b8]" /> : <Volume2 className="w-4 h-4 text-[#f5e0c3]" />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onTogglePlay}
                    className="p-3 rounded-full bg-gradient-to-r from-[#f5e0c3] to-[#e8c5b8] text-[#020617] hover:opacity-90 transition-opacity shadow-lg shadow-[#f5e0c3]/20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <button
                    onClick={handleNextTrack}
                    className="p-2 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Próxima Faixa"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalist Sticky Pill Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-500 shadow-2xl ${
            isPlaying
              ? 'bg-[#0f172a]/90 border-[#f5e0c3] text-[#f5e0c3] shadow-[#f5e0c3]/10'
              : 'bg-[#020617]/80 border-[#f5e0c3]/30 text-slate-300 hover:border-[#f5e0c3]/60 hover:text-white'
          } backdrop-blur-xl`}
        >
          {/* Spinning Vinyl Disk Icon */}
          <div className={`relative w-6 h-6 rounded-full bg-[#020617] border border-[#f5e0c3]/40 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
            <Disc className="w-4 h-4 text-[#f5e0c3]" />
            <div className="absolute w-1 h-1 bg-[#f5e0c3] rounded-full" />
          </div>

          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 leading-none mb-1">
              {isPlaying ? 'TRILHA SONORA' : 'ÁUDIO PAUSADO'}
            </span>
            <span className="text-xs font-serif text-white font-normal truncate max-w-[120px] leading-none">
              {currentTrack.title.split(' - ')[0]}
            </span>
          </div>

          {/* Quick Play/Pause Action */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
            className="ml-2 p-1.5 rounded-full bg-[#f5e0c3]/10 hover:bg-[#f5e0c3]/20 text-[#f5e0c3] transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </div>
        </button>
      </motion.div>
    </>
  );
};
