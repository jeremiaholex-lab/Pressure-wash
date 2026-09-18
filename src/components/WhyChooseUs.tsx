import React from 'react';
import { ShieldCheck, Check, X, AlertTriangle, Sparkles, Droplets, Leaf, Award } from 'lucide-react';
import { COMPARISON_POINTS } from '../data/mockData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            The Apply The Pressure Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Central Florida Trusts Our Pressure & Soft Wash Teams
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Exterior cleaning isn't just about high water pressure. See how our dedicated techniques and commercial equipment protect your property value.
          </p>
        </ScrollReveal>

        {/* Comparison Table */}
        <ScrollReveal direction="up" delay={0.1} className="overflow-x-auto pb-4">
          <div className="min-w-[680px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-950 text-white p-4 sm:p-5 text-xs sm:text-sm font-extrabold items-center border-b border-slate-800">
              <div className="col-span-4 text-slate-300">Feature / Standard</div>
              <div className="col-span-4 text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Apply The Pressure Washing
              </div>
              <div className="col-span-4 text-slate-400">Typical Budget Handyman / DIY</div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {COMPARISON_POINTS.map((pt, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm items-center ${
                    idx % 2 === 0
                      ? 'bg-white dark:bg-slate-900'
                      : 'bg-slate-50/70 dark:bg-slate-850/50'
                  }`}
                >
                  <div className="col-span-4 font-bold text-slate-900 dark:text-white pr-2">
                    {pt.feature}
                  </div>

                  {/* Apply The Pressure Column */}
                  <div className="col-span-4 font-semibold text-slate-900 dark:text-slate-100 flex items-start gap-2 pr-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">{pt.us}</span>
                  </div>

                  {/* Others Column */}
                  <div className="col-span-4 text-slate-500 dark:text-slate-400 flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{pt.others}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Pillars of Confidence */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          <StaggerItem>
            <div className="h-full p-6 rounded-2xl bg-cyan-50/50 dark:bg-slate-800/80 border border-cyan-200/80 dark:border-slate-700 shadow-xs space-y-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-600/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                $1,000,000 Liability Coverage
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Rest easy knowing you are fully indemnified. We are licensed and carry extensive commercial liability insurance covering your property, roofing, landscaping, and fixtures.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-6 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/80 border border-emerald-200/80 dark:border-slate-700 shadow-xs space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Plant & Pet Protective Protocol
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                We pre-saturate all flower beds, palms, and grass roots before applying eco-detergents, and finish with a full freshwater botanical neutralizer so your landscape thrives.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full p-6 rounded-2xl bg-blue-50/50 dark:bg-slate-800/80 border border-blue-200/80 dark:border-slate-700 shadow-xs space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                100% Streak-Free Guarantee
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                If you aren't completely thrilled with the clean finish on your driveway, siding, or screen enclosure, we return and re-treat the area immediately at zero extra charge.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
