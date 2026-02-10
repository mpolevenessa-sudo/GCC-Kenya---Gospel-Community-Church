
import React, { useEffect, useState } from 'react';
import { Theme } from '../types';

/**
 * ThemeToggle Component
 * Handles switching between Light, Dark, and System modes.
 * Listens for system changes to ensure the app stays in sync with the device.
 */
const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('gcc-theme') as Theme;
    return saved || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (targetTheme: Theme) => {
      if (targetTheme === 'system') {
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', systemIsDark);
      } else {
        root.classList.toggle('dark', targetTheme === 'dark');
      }
    };

    // Apply the theme immediately when state changes
    applyTheme(theme);
    localStorage.setItem('gcc-theme', theme);

    // If 'system' is active, listen for OS-level changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      
      // Modern browsers use addEventListener, older ones use addListener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // @ts-ignore - support for older Safari/Browsers
        mediaQuery.addListener(handleChange);
        // @ts-ignore
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [theme]);

  return (
    <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
      {(['light', 'dark', 'system'] as Theme[]).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
            theme === t
              ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
