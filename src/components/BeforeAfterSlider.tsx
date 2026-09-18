import React, { useState, useRef } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../data/mockData';
import { ScrollReveal } from './ScrollReveal';

interface BeforeAfterSliderProps {
  onSelectService: (serviceId: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onSelectService }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = BEFORE_AFTER_CASES[activeCaseIndex];

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleSliderMove(e.touches[0].clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Interactive Visual Proof
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See the Dramatic Florida Transformation
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Slide the handle left and right to see real results achieved with our commercial-grade soft washing and rotary surface equipment.
          </p>
        </ScrollReveal>

        {/* Case Switcher Tabs */}
        <ScrollReveal direction="up" delay={0.1} className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {BEFORE_AFTER_CASES.map((item, idx) => {
            const isSelected = activeCaseIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPos(50);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{item.category}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                )}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Interactive Comparison Stage */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Canvas (Left / Main) */}
            <ScrollReveal direction="up" delay={0.15} className="lg:col-span-8">
              <div
                ref={containerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={onMouseMove}
                onTouchMove={onTouchMove}
                className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-900 dark:border-slate-700 select-none cursor-ew-resize aspect-4/3 sm:aspect-16/10 bg-slate-900"
              >
                {/* AFTER Image (Full background) */}
                <img
                  src={activeCase.image}
                  alt={`${activeCase.title} - Restored Clean`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Simulated BEFORE Filtered Layer clipped to sliderPos */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={activeCase.image}
                    alt={`${activeCase.title} - Before Cleaning`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-[1.3] saturate-[0.6] sepia-[0.35]"
                    style={{
                      width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                      maxWidth: 'none',
                    }}
                  />
                  {/* Subtle grunge overlay for authentic algae simulation on the before slice */}
                  <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply pointer-events-none" />

                  {/* "BEFORE" Badge */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-xs font-black uppercase px-3 py-1.5 rounded-lg border border-red-500/40 shadow-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    BEFORE (Dark Algae & Grime)
                  </div>
                </div>

                {/* "AFTER" Badge */}
                <div className="absolute top-4 right-4 bg-slate-900/90 text-white text-xs font-black uppercase px-3 py-1.5 rounded-lg border border-emerald-500/40 shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  AFTER (Apply The Pressure)
                </div>

                {/* Divider Line & Drag Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-ew-resize z-20"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center border-2 border-slate-900 hover:scale-110 active:scale-95 transition-transform">
                    <ArrowLeftRight className="w-5 h-5 text-cyan-700 stroke-[2.5]" />
                  </div>
                </div>

                {/* Bottom hint banner */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full pointer-events-none flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3 h-3 text-cyan-400" />
                  Drag handle or tap across image to inspect
                </div>
              </div>

              {/* Slider quick preset buttons */}
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <span>Preset Views:</span>
                <button
                  type="button"
                  onClick={() => setSliderPos(15)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                >
                  Mostly Clean (85%)
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPos(50)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                >
                  50 / 50 Split
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPos(85)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                >
                  Mostly Grimy
                </button>
              </div>
            </ScrollReveal>

            {/* Case Details Card (Right) */}
            <ScrollReveal direction="up" delay={0.2} className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                  Featured Case Study
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {activeCase.title}
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-red-50/70 dark:bg-red-950/30 p-3 rounded-xl border border-red-200/60 dark:border-red-900/40">
                  <p className="text-xs font-bold text-red-800 dark:text-red-300 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    Problem Identified:
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                    {activeCase.beforeDescription}
                  </p>
                </div>

                <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40">
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Our Solution & Outcome:
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                    {activeCase.afterDescription}
                  </p>
                </div>
              </div>

              {/* Stat Callout */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">{activeCase.statLabel}</p>
                  <p className="text-2xl font-black text-cyan-700 dark:text-cyan-400">{activeCase.statValue}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <button
                id="book-this-transformation-btn"
                onClick={() => onSelectService(activeCase.id.includes('driveway') ? 'driveway-concrete' : activeCase.id.includes('roof') ? 'roof-wash' : activeCase.id.includes('pool') ? 'pool-cage-lanai' : 'house-wash')}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Get This Result on Your Home</span>
                <ChevronRight className="w-4 h-4 text-cyan-400 dark:text-white" />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
