
import React from 'react';

/**
 * Hero Component
 * Mobile-optimized landing visual.
 */
const Hero: React.FC = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://picsum.photos/id/1015/1920/1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)'
        }}
      />
      <div className="relative z-10 text-center px-6 max-w-lg">
        <h1 className="text-3xl font-extrabold text-white mb-4 leading-tight">
          Growing in Grace,<br />
          <span className="text-primary-400">Impacting Community</span>
        </h1>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Nairobi's hub for gospel-centered growth and biblical community.
        </p>
        <div className="flex flex-col gap-3">
          <button className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg shadow-primary-900/20 active:scale-95 transition-all">
            Join Next Service
          </button>
          <button className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold active:scale-95 transition-all">
            Watch Media
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
