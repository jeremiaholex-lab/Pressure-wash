import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, Clock, Truck, Phone } from 'lucide-react';
import { SERVICE_AREAS, BUSINESS_INFO } from '../data/mockData';
import { ScrollReveal } from './ScrollReveal';

interface ServiceAreaCheckerProps {
  onOpenBooking: () => void;
}

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({ onOpenBooking }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{
    found: boolean;
    name?: string;
    county?: string;
  } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    const matched = SERVICE_AREAS.find((area) => {
      if (area.city.toLowerCase().includes(cleanQuery)) return true;
      if (area.county.toLowerCase().includes(cleanQuery)) return true;
      if (area.zipList.some((zip) => zip.includes(cleanQuery))) return true;
      return false;
    });

    if (matched) {
      setResult({
        found: true,
        name: matched.city,
        county: matched.county,
      });
    } else {
      if (cleanQuery.length === 5 && (cleanQuery.startsWith('344') || cleanQuery.startsWith('321') || cleanQuery.startsWith('346'))) {
        setResult({
          found: true,
          name: `ZIP Code ${cleanQuery}`,
          county: 'Central Florida Area',
        });
      } else {
        setResult({
          found: false,
        });
      }
    }
  };

  return (
    <section id="areas" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Context & Interactive Checker */}
          <ScrollReveal direction="up" delay={0.05} className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Marion & Citrus County Coverage
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Proudly Serving Central Florida Neighborhoods Daily
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Based right here in Ocala, FL, our mobile rigs travel across all of Marion and Citrus counties. Check your ZIP code below for guaranteed $0 trip charges.
            </p>

            {/* Interactive ZIP / City Lookup Bar */}
            <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-3 gap-2">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your ZIP (e.g. 34471) or City name"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setResult(null);
                  }}
                  className="w-full text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-hidden py-2 bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Check Coverage
              </button>
            </form>

            {/* Search Result Feedback */}
            {result && (
              <div
                className={`p-4 rounded-2xl border transition animate-in fade-in duration-200 ${
                  result.found
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                }`}
              >
                {result.found ? (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-sm text-emerald-900 dark:text-emerald-200">
                        Yes! We Service {result.name} ({result.county})!
                      </p>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
                        Our crews are active in your area with zero travel surcharges and 24-48 hr scheduling windows.
                      </p>
                      <button
                        onClick={onOpenBooking}
                        className="mt-3 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition inline-flex items-center gap-1 cursor-pointer"
                      >
                        Book Service in {result.name} →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-sm text-amber-900 dark:text-amber-200">
                        Custom Route Inquiry for "{query}"
                      </p>
                      <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                        We frequently accommodate surrounding Florida communities! Call our office to confirm dispatch availability.
                      </p>
                      <a
                        href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-cyan-800 dark:text-cyan-400 underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call Office: {BUSINESS_INFO.phoneOffice}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hub Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Primary Base</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">Ocala, FL</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Service Radius</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">45+ Miles</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Trip Fee</p>
                <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">$0 Surcharge</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Serviced Towns Chips & Badges */}
          <ScrollReveal direction="up" delay={0.15} className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-5">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <Truck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              Central Florida Areas on Daily Routes:
            </h3>

            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(area.city);
                    setResult({ found: true, name: area.city, county: area.county });
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    area.highlight
                      ? 'bg-cyan-50 dark:bg-cyan-950/60 border-2 border-cyan-500/40 text-cyan-900 dark:text-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{area.city}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">({area.county.split(' ')[0]})</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <p className="flex items-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                Same-Day & Next-Day appointments often available for HOA notices.
              </p>
              <p className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                Residential homes, commercial storefronts, and equestrian horse farms.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
