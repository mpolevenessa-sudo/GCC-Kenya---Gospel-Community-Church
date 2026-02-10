
import React from 'react';

/**
 * MobileHeader Component
 * Sticky top header displaying the app title.
 * The theme toggle has been removed from here as per user request
 * and is now exclusively available in the Profile section.
 */
interface MobileHeaderProps {
  title: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">G</div>
        <h1 className="font-bold text-slate-900 dark:text-white truncate max-w-[200px] tracking-tight">{title}</h1>
      </div>
      {/* Theme toggle removed from here and moved to Profile section settings */}
      <div className="w-8 h-8"></div> {/* Spacer to maintain layout balance if needed */}
    </header>
  );
};

export default MobileHeader;
