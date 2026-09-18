import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Star, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/mockData';
import { Logo } from './Logo';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" isDark={true} />

            <p className="text-xs text-slate-400 leading-relaxed">
              Ocala and Marion County’s premier commercial and residential exterior cleaning specialists.
              Safe low-pressure chemical soft washing and commercial 4,000 PSI concrete restoration.
            </p>

            <div className="space-y-2 text-xs">
              <a
                href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
                className="flex items-center gap-2 text-slate-200 hover:text-cyan-400 transition"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Office: <strong>{BUSINESS_INFO.phoneOffice}</strong></span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneMobileRaw}`}
                className="flex items-center gap-2 text-slate-200 hover:text-cyan-400 transition"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mobile / Dispatch: <strong>{BUSINESS_INFO.phoneMobile}</strong></span>
              </a>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Serving Ocala, The Villages, Marion & Citrus Counties</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mon - Sat: 7:00 AM - 7:00 PM (24-Hr Emergency Service)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Exterior Cleaning Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-white transition flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                    {srv.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Service Areas
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Ocala, FL (All ZIPs)</li>
              <li>The Villages, FL</li>
              <li>Belleview, FL</li>
              <li>Dunnellon, FL</li>
              <li>Crystal River, FL</li>
              <li>Summerfield, FL</li>
              <li>Silver Springs, FL</li>
              <li>Inverness & Homosassa</li>
            </ul>
          </div>

          {/* Col 4: Trust Badges & Action */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Licensed & Insured
            </h4>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-300" />
                <span>5.0 ★ Google & Angi (108+ Reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>$1,000,000 Commercial Liability</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer text-center block"
            >
              Get Instant Estimate & Book
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Apply The Pressure Washing. All Rights Reserved. Ocala, FL.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Residential & Commercial Exterior Cleaning</span>
            <span>•</span>
            <span>Marion & Citrus Counties</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
