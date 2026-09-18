import React from 'react';
import { Phone, Calendar, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface MobileActionBarProps {
  onOpenBooking: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/80 p-2.5 px-4 shadow-2xl">
      <div className="flex items-center gap-2">
        {/* Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
          id="mobile-action-call-btn"
          className="flex-1 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-600 transition"
        >
          <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="truncate">Call Office</span>
        </a>

        {/* Instant Quote & Book Button */}
        <button
          onClick={onOpenBooking}
          id="mobile-action-quote-btn"
          className="flex-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 active:from-cyan-400 active:to-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-600/30 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
          <span>Get Instant Quote</span>
        </button>
      </div>
    </div>
  );
};
