import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  Star,
  Clock,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
  Droplets,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Video,
  Image as ImageIcon,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import { HeroVideoModal } from './HeroVideoModal';
import { ScrollReveal } from './ScrollReveal';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [quickService, setQuickService] = useState('house-wash');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [rightMediaTab, setRightMediaTab] = useState<'video' | 'photo'>('video');
  const [cardVideoPlaying, setCardVideoPlaying] = useState(false);
  const [cardVideoMuted, setCardVideoMuted] = useState(true);
  const cardVideoRef = useRef<HTMLVideoElement>(null);

  const quickOptions = [
    { id: 'house-wash', label: 'House Soft Wash', est: 'From $189' },
    { id: 'driveway-concrete', label: 'Driveway & Walkway', est: 'From $129' },
    { id: 'roof-wash', label: 'Roof Algae Removal', est: 'From $289' },
    { id: 'pool-cage-lanai', label: 'Pool Cage & Lanai', est: 'From $220' },
  ];

  useEffect(() => {
    // Attempt muted autoplay on mount or tab switch
    const video = cardVideoRef.current;
    if (video) {
      video.muted = cardVideoMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setCardVideoPlaying(true);
          })
          .catch(() => {
            // Autoplay restricted by browser iframe policy until user interaction
            setCardVideoPlaying(false);
          });
      }
    }
  }, [rightMediaTab]);

  const toggleCardVideoPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = cardVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setCardVideoPlaying(true))
        .catch(() => setCardVideoPlaying(false));
    } else {
      video.pause();
      setCardVideoPlaying(false);
    }
  };

  const toggleCardVideoMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = cardVideoRef.current;
    if (!video) return;
    video.muted = !cardVideoMuted;
    setCardVideoMuted(!cardVideoMuted);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle modern background grid and ambient lighting (No duplicate background video) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Prop & Conversion Triggers */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Trust Pill with Video Notice */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm text-cyan-300 shadow-inner flex-wrap">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="font-semibold tracking-wide">Ocala & Marion County’s #1 Exterior Cleaner</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 text-cyan-300 hover:text-white font-medium underline underline-offset-2 decoration-cyan-400/50 cursor-pointer"
              >
                <Play className="w-2.5 h-2.5 fill-cyan-400" />
                <span>Watch Intro Video</span>
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Restore Your Home’s Pristine Curb Appeal in{' '}
              <span className="text-cyan-400 underline decoration-cyan-500/40 decoration-wavy decoration-2">
                One Afternoon
              </span>
              .
            </h1>

            {/* Value description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Say goodbye to ugly black roof streaks, slippery green driveway mold, and weathered stucco.
              We combine safe <strong className="text-white font-bold">zero-pressure soft washing</strong> with
              commercial-grade surface spinners for a guaranteed streak-free transformation.
            </p>

            {/* Quick Hero Interactive Quote Box */}
            <div className="bg-slate-900/85 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl backdrop-blur-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Select a service to start your instant online quote:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {quickOptions.map((opt) => {
                  const isSelected = quickService === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuickService(opt.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      <span className="text-[11px] text-cyan-400 font-semibold mt-1">{opt.est}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  id="hero-instant-quote-btn"
                  onClick={() => onOpenBooking(quickService)}
                  className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-cyan-600/25 flex items-center justify-center gap-2 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>See Price & Schedule Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Introduction Video Trigger Button */}
                <button
                  type="button"
                  id="hero-watch-video-btn"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white font-semibold text-xs sm:text-sm border border-cyan-500/30 flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  title="Watch the original on-site introduction video"
                >
                  <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                  <span>Watch Video</span>
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
                  className="py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden xl:inline">Call (352) 653-3882</span>
                  <span className="xl:hidden">Call</span>
                </a>
              </div>
            </div>

            {/* Trust Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">$1M Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Eco-Friendly & Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">24-Hr Dispatch</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Video & Photographic Showcase */}
          <ScrollReveal direction="left" delay={0.2} distance={32} className="lg:col-span-5 relative" id="hero-video">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 flex flex-col">
              {/* Media Switcher Tab Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 z-10">
                <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setRightMediaTab('video')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                      rightMediaTab === 'video'
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    <span>Crew Action Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRightMediaTab('photo')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                      rightMediaTab === 'photo'
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Photo Proof</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  title="Open video overlay in full screen"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Full Screen</span>
                </button>
              </div>

              {/* Media Viewport */}
              <div
                className="relative h-[360px] sm:h-[420px] w-full bg-black group overflow-hidden cursor-pointer select-none"
                onClick={toggleCardVideoPlay}
              >
                {rightMediaTab === 'video' ? (
                  <>
                    <video
                      ref={cardVideoRef}
                      autoPlay
                      muted={cardVideoMuted}
                      loop
                      playsInline
                      preload="auto"
                      poster="/videos/video-poster.jpg"
                      className="w-full h-full object-cover"
                      onPlay={() => setCardVideoPlaying(true)}
                      onPause={() => setCardVideoPlaying(false)}
                    >
                      <source src="/videos/hero-video-fast.mp4" type="video/mp4" />
                      <source src="/videos/hero-video-web.mp4" type="video/mp4" />
                      <source src="/videos/hero-video.mp4" type="video/mp4" />
                      <source src="https://applythepressurewashing.com/wp-content/uploads/2026/04/herovideoapplythepressure_compressed.mp4" type="video/mp4" />
                    </video>

                    {/* Prominent Center Play Button Overlay (when paused or if autoplay is blocked) */}
                    {!cardVideoPlaying && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-2xs z-20 transition-opacity duration-200">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center shadow-2xl transition transform hover:scale-110 border-2 border-white/40">
                          <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white text-white ml-1" />
                        </div>
                        <p className="mt-3 text-xs sm:text-sm font-bold text-white bg-slate-950/80 px-3 py-1 rounded-full border border-slate-700/80 shadow-md">
                          Click to Play Authentic Job-Site Video
                        </p>
                      </div>
                    )}

                    {/* Top Floating Live Action Badge */}
                    <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-lg shadow-md flex items-center gap-2 z-10 pointer-events-none">
                      <span className={`w-2 h-2 rounded-full ${cardVideoPlaying ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                        {cardVideoPlaying ? 'Playing • Live Action Footage' : 'On-Site Video • Ocala, FL'}
                      </span>
                    </div>

                    {/* Floating Video Controls Overlay */}
                    <div
                      className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-2 rounded-xl flex items-center justify-between z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => toggleCardVideoPlay(e)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
                          title={cardVideoPlaying ? 'Pause Video' : 'Play Video'}
                          aria-label={cardVideoPlaying ? 'Pause Video' : 'Play Video'}
                        >
                          {cardVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => toggleCardVideoMute(e)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer flex items-center gap-1"
                          title={cardVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
                          aria-label={cardVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
                        >
                          {cardVideoMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                        </button>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {cardVideoMuted ? 'Muted (Tap to hear crew)' : 'Sound On'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsVideoModalOpen(true)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Theater View</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src="/src/assets/images/hero_pressure_wash_1789688170275.jpg"
                      alt="Professional pressure washing technician cleaning Florida residential driveway"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl">
                      <p className="text-[11px] font-bold text-white">Driveway & Concrete Clean</p>
                      <p className="text-[10px] text-cyan-400">Streak-Free Rotary Surface Cleaning</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Floating Rating Badge */}
            <div className="absolute -bottom-5 -right-2 hidden sm:flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-2.5 rounded-2xl shadow-xl z-10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base">
                ★
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">5.0 Star Rated</p>
                <p className="text-[10px] text-slate-400">108+ Central FL Reviews</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Full-Screen Introduction Video Overlay Modal */}
      <HeroVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onOpenBooking={() => onOpenBooking(quickService)}
      />
    </section>
  );
};

