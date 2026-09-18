import React, { useState } from 'react';
import { Phone, Calendar, ShieldCheck, Star, Menu, X, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors duration-200">
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 py-1.5 px-4 sm:px-6 border-b border-slate-800/60 text-[11px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span className="text-emerald-400 font-medium hidden sm:inline">Dispatching Daily:</span>
            <span className="text-slate-200 font-medium">Ocala & Marion County, FL</span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline">$1M Insured</span>
            <span className="text-slate-600 hidden lg:inline">•</span>
            <span className="text-amber-300 hidden lg:inline-flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-300" />
              5.0 Star Rated (108+ Reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-400 hidden sm:inline">Mon–Sat 7am–7pm</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>{BUSINESS_INFO.phoneOffice}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <Logo size="md" isDark={isDark} />
          </a>

          {/* Desktop Navigation Links — Streamlined to 4 high-value anchors with generous breathing room */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-medium tracking-normal text-slate-600 dark:text-slate-300">
            <a
              href="#services"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-1"
            >
              Services
            </a>
            <a
              href="#before-after"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-1"
            >
              Before & After
            </a>
            <a
              href="#estimator"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-1"
            >
              Pricing Estimator
            </a>
            <a
              href="#reviews"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-1"
            >
              Reviews
            </a>
          </nav>

          {/* Right Header Actions: Clean, uncluttered layout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Exactly ONE Theme Toggle Button */}
            <ThemeToggle id="header-theme-toggle" />

            {/* Direct Call Link on Desktop */}
            <a
              href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              id="header-phone-link"
              title="Call Apply The Pressure directly"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{BUSINESS_INFO.phoneOffice}</span>
            </a>

            {/* Primary Action Button */}
            <button
              id="header-book-btn"
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Instant Quote</span>
            </button>

            {/* Mobile Call Icon Button */}
            <a
              href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition sm:hidden"
              aria-label="Call Office"
            >
              <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 font-medium text-slate-800 dark:text-slate-200 text-sm">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Our Pressure & Soft Wash Services
            </a>
            <a
              href="#hero-video"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between"
            >
              <span>On-Site Crew Video</span>
              <span className="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-300 px-2 py-0.5 rounded font-bold">Watch</span>
            </a>
            <a
              href="#before-after"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between"
            >
              <span>Before & After Showcase</span>
              <span className="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-300 px-2 py-0.5 rounded font-bold">Slider</span>
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Instant Cost Calculator
            </a>
            <a
              href="#areas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Service Areas (Marion & Citrus)
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Customer Reviews (5.0 Stars)
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Frequently Asked Questions
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Direct Dispatch Hotline:</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Office: {BUSINESS_INFO.phoneOffice}</p>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Cell: {BUSINESS_INFO.phoneMobile}</p>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
                className="p-3 bg-cyan-600 text-white rounded-xl shadow-xs"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-center shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Calculate Estimate & Schedule
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
