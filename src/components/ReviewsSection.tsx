import React, { useState } from 'react';
import { Star, CheckCircle2, Quote, ThumbsUp, Sparkles, ExternalLink } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = REVIEWS.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.service.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Verified Customer Satisfaction
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Rated 5.0 Stars Across Marion & Citrus Counties
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Read authentic feedback from Florida homeowners, equestrian farm managers, and business owners.
          </p>
        </div>

        {/* Rating Trust Banner */}
        <div className="max-w-4xl mx-auto mb-12 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="text-4xl sm:text-5xl font-black text-amber-400">5.0</div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold">
                Perfect 5.0 Rating on Google, Angi & HomeAdvisor
              </p>
              <p className="text-[11px] text-slate-400">108+ Local Florida Homeowner Reviews</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:border-l sm:border-slate-800 sm:pl-6">
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-400">100%</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Recommendation Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-cyan-400">0</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Property Claims</p>
            </div>
          </div>
        </div>

        {/* Review Filter Chips */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'house', label: 'House Soft Wash' },
            { id: 'driveway', label: 'Driveways' },
            { id: 'roof', label: 'Roof Algae' },
            { id: 'pool', label: 'Pool Cage / Lanai' },
            { id: 'barn', label: 'Horse Barns / Commercial' },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeFilter === chip.id
                  ? 'bg-slate-900 dark:bg-cyan-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    {rev.source} Review
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                    {rev.author}
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 fill-cyan-100 dark:fill-cyan-950" />
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{rev.location}</p>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
