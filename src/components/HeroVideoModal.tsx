import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, ArrowRight, ShieldCheck, Star, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeroVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  videoSrc?: string;
}

export const HeroVideoModal: React.FC<HeroVideoModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  videoSrc = '/videos/hero-video-fast.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay with sound restricted by browser; fallback to paused or muted
            setIsPlaying(false);
          });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Apply The Pressure — Introduction & On-Site Showcase
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Official crew video footage from Ocala & Marion County, FL
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            id="close-hero-video-modal-btn"
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
            aria-label="Close video modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div
          className="relative aspect-video w-full bg-black group cursor-pointer select-none"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            preload="auto"
            poster="/videos/video-poster.jpg"
            className="w-full h-full object-contain"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <source src="https://applythepressurewashing.com/wp-content/uploads/2026/04/herovideoapplythepressure_compressed.mp4" type="video/mp4" />
          </video>

          {/* Center Play Overlay when Paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
              <div className="w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center shadow-2xl transition transform hover:scale-110 border-2 border-white/50">
                <Play className="w-8 h-8 fill-white ml-0.5 text-white" />
              </div>
            </div>
          )}

          {/* Quick Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-xs transition cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-xs transition cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-xs text-slate-200 font-medium pl-1">
                  On-Site Footage
                </span>
              </div>

              <button
                type="button"
                onClick={handleFullScreen}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-xs transition cursor-pointer"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer with Value Proposition & Direct CTAs */}
        <div className="p-4 sm:p-5 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1 text-cyan-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              $1M Insured
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1 text-amber-300 font-semibold">
              <Star className="w-4 h-4 fill-amber-300" />
              5.0 ★ Rated
            </span>
            <span className="text-slate-700">•</span>
            <span>Roof Soft Wash & Surface Spinner Clean</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call Crew</span>
            </a>

            <button
              type="button"
              id="video-modal-book-cta-btn"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/25 transition cursor-pointer"
            >
              <span>Instant Online Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
