import React, { useState } from 'react';
import { Shield, Sparkles, Check, ArrowRight, Droplets, Info } from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface ServicesShowcaseProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'specialty' | 'commercial'>('all');

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Droplets className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Professional Exterior Cleaning
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tailored Solutions for Every Central Florida Surface
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            We never use a "one-size-fits-all" pressure approach. Delicate roofs and stucco receive gentle chemical soft washing, while driveways get industrial 4,000 PSI deep rotary power.
          </p>
        </ScrollReveal>

        {/* Category Filter Chips */}
        <ScrollReveal direction="up" delay={0.1} className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Services (6)' },
            { id: 'residential', label: 'Residential Cleaning' },
            { id: 'specialty', label: 'Pool Cage & Lanai' },
            { id: 'commercial', label: 'Commercial & HOA' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-700 dark:bg-cyan-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Services Grid */}
        <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map((srv) => (
            <StaggerItem key={srv.id} className="h-full">
              <div
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full"
              >
                {/* Image thumbnail with badges */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {srv.popular && (
                    <div className="absolute top-3 right-3 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-200" />
                      Most Popular
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                        {srv.category}
                      </span>
                      <h3 className="text-lg font-black text-white leading-snug">{srv.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-cyan-800 dark:text-cyan-300 leading-snug">
                      {srv.tagline}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Feature Checklist */}
                    <div className="pt-2 space-y-1.5">
                      {srv.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Safe For Surface Badges */}
                    <div className="pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                        Safe For Surfaces:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {srv.safeFor.map((surf, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700"
                          >
                            {surf}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Bottom Row */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Estimated from</span>
                      <span className="text-xl font-black text-slate-900 dark:text-white">${srv.startingPrice}</span>
                    </div>

                    <button
                      onClick={() => onSelectService(srv.id)}
                      className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Instant Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
