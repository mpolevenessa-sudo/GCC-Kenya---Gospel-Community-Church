
import React from 'react';

/**
 * Footer Component
 * Slim version for mobile view.
 */
const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 text-center text-slate-400 dark:text-slate-600">
      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-500 font-bold">G</div>
      <p className="text-[10px] uppercase tracking-widest font-bold mb-2">GCC Kenya</p>
      <p className="text-[10px] mb-8">Grace Community Church Nairobi. Founded in Faith.</p>
      <div className="flex justify-center space-x-6">
        {['fb', 'ig', 'tw', 'yt'].map(s => (
          <div key={s} className="w-1 h-1 bg-slate-400 dark:bg-slate-700 rounded-full"></div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
