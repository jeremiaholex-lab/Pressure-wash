import React from 'react';
import { Sparkles, Droplets, MapPin } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  isDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  isDark = false,
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  }[size];

  const titleSize = {
    sm: 'text-sm font-bold tracking-tight',
    md: 'text-sm sm:text-base font-extrabold tracking-tight',
    lg: 'text-xl sm:text-2xl font-black tracking-tight',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group shrink-0 ${className}`}>
      {/* Newly Designed Brand Emblem with Dynamic Water Shield */}
      <div className="relative shrink-0">
        <div
          className={`${iconDimensions} rounded-xl sm:rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-600 via-blue-600 to-teal-400 shadow-sm shadow-cyan-600/20 group-hover:scale-105 group-hover:shadow-cyan-500/30 transition-all duration-300`}
        >
          <div className="w-full h-full rounded-[10px] sm:rounded-[14px] overflow-hidden bg-slate-950 relative flex items-center justify-center">
            {/* Generated Emblem Image */}
            <img
              src="/src/assets/images/business_logo_1789688572681.jpg"
              alt="Apply The Pressure Washing Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Water spray overlay highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-white/20 pointer-events-none" />
          </div>
        </div>

        {/* Live Active Status Indicator Dot */}
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 shadow-xs">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
        </span>
      </div>

      {/* Brand Typography & Hierarchy */}
      <div className="flex flex-col justify-center">
        <span
          className={`${titleSize} leading-tight ${
            isDark ? 'text-white' : 'text-slate-900 dark:text-white'
          } transition-colors whitespace-nowrap`}
        >
          APPLY THE PRESSURE
        </span>
        {showSubtitle && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-cyan-600 dark:text-cyan-400 flex items-center gap-0.5 whitespace-nowrap">
              <MapPin className="w-2.5 h-2.5 text-cyan-500 shrink-0" />
              PRESSURE & SOFT WASH • OCALA, FL
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
