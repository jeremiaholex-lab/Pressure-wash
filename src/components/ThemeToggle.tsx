import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  id?: string;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  id = 'theme-toggle-btn',
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      id={id}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
      className={`relative inline-flex items-center justify-center gap-1.5 p-1.5 sm:p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
        isDark
          ? 'bg-slate-800/90 hover:bg-slate-700 text-amber-300 border-slate-700 shadow-inner hover:border-amber-400/40'
          : 'bg-slate-100/90 hover:bg-slate-200 text-slate-700 border-slate-200 shadow-xs hover:border-cyan-500/40'
      } ${className}`}
      title={`Click to switch to ${isDark ? 'Light' : 'Dark'} theme (Current: ${isDark ? 'Dark' : 'Light'})`}
    >
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-90" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-600 transition-transform duration-300 -rotate-12 hover:rotate-0" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold whitespace-nowrap select-none">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
