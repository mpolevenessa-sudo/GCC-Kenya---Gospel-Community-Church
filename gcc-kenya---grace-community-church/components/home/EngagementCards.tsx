
import React, { useState } from 'react';

interface FullScreenViewProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  bgClass?: string;
  footerActions?: React.ReactNode;
}

const FullScreenView: React.FC<FullScreenViewProps> = ({ onClose, title, children, bgClass = "bg-white dark:bg-slate-950", footerActions }) => (
  <div className={`fixed inset-0 z-[100] flex flex-col animate-in fade-in zoom-in-95 duration-300 ${bgClass}`}>
    <header className="px-4 h-16 flex items-center justify-between shrink-0">
      <button onClick={onClose} className="p-2 -ml-2 text-slate-600 dark:text-slate-300 active:scale-90 transition-transform">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">{title}</h2>
      <div className="w-10"></div>
    </header>
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {children}
    </div>
    {footerActions && (
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-around bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        {footerActions}
      </div>
    )}
  </div>
);

const ActionIcons: React.FC<{ iconClass?: string; containerClass?: string }> = ({ iconClass = "w-5 h-5", containerClass = "flex items-center space-x-6" }) => (
  <div className={containerClass}>
    <button className="flex items-center space-x-1 text-white hover:text-red-400 transition-colors drop-shadow-md">
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
    <button className="flex items-center space-x-1 text-white hover:text-primary-400 transition-colors drop-shadow-md">
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>
    <button className="flex items-center space-x-1 text-white hover:text-green-400 transition-colors drop-shadow-md">
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    </button>
  </div>
);

const EngagementCards: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'votd' | 'scripture' | 'prayer' | null>(null);

  const votdData = {
    verse: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    ref: "Jeremiah 29:11",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800"
  };

  const scriptureExplanation = (
    <div className="flex flex-col items-center justify-center h-full pb-10">
      <div className="bg-orange-50 dark:bg-orange-900/10 p-8 rounded-[40px] border border-orange-100 dark:border-orange-800/30 shadow-xl max-w-md w-full animate-in slide-in-from-bottom-4 duration-500">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800/50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 text-center">Scripture Explanation</h3>
        <p className="leading-relaxed text-slate-600 dark:text-slate-300 italic mb-6 border-l-4 border-orange-400 pl-4 py-2">
          "This passage offers profound hope by reminding us that God is not a passive observer but an active architect of our future."
        </p>
        <p className="leading-relaxed text-slate-600 dark:text-slate-300 text-sm">
          While the exiles faced 70 years of captivity, God's promise was not for immediate escape, but for a guaranteed welfare. It teaches us to trust God's sovereignty even when the timeline doesn't match our own.
        </p>
      </div>
    </div>
  );

  const prayerContent = (
    <div className="flex flex-col items-center text-center space-y-10 pt-10 h-full">
      <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 mb-2">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <div className="space-y-4 max-w-md">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">A Prayer for Hope</h3>
        <div className="h-px w-20 bg-indigo-200 dark:bg-indigo-800 mx-auto"></div>
        <p className="text-2xl font-serif leading-relaxed text-slate-700 dark:text-slate-200 italic px-4">
          "Heavenly Father, we thank You that Your plans for us are good. When we feel lost or anxious, anchor our souls in Your promises. Grant us the patience to wait on Your timing and the faith to trust Your heart. In Jesus' name, Amen."
        </p>
      </div>
      <div className="pt-10">
        <button className="px-12 py-5 bg-indigo-600 text-white rounded-[24px] font-bold shadow-2xl active:scale-95 transition-all text-lg ring-4 ring-indigo-500/20">
          Amen
        </button>
      </div>
    </div>
  );

  return (
    <div className="px-4 space-y-4">
      {/* Verse of the Day Card - Bigger and Taller */}
      <div 
        onClick={() => setActiveModal('votd')}
        className="relative min-h-[500px] w-full rounded-[48px] overflow-hidden shadow-2xl group active:scale-[0.98] transition-all cursor-pointer"
      >
        <img src={votdData.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="VOTD Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-x-8 bottom-12 space-y-6">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-px bg-primary-400"></span>
            <span className="text-primary-400 font-bold text-xs uppercase tracking-[0.3em]">Verse of the Day</span>
          </div>
          <h2 className="text-3xl font-serif text-white leading-relaxed italic drop-shadow-lg">
            "{votdData.verse}"
          </h2>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-white/90">{votdData.ref}</span>
            {/* Inline icons visible on the card */}
            <div onClick={(e) => e.stopPropagation()} className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <ActionIcons iconClass="w-5 h-5" containerClass="flex items-center space-x-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Guided Scripture - Themed Card */}
        <div 
          onClick={() => setActiveModal('scripture')}
          className="bg-orange-50 dark:bg-orange-950/20 p-8 rounded-[40px] border border-orange-100 dark:border-orange-900/30 flex flex-col items-center justify-center space-y-4 aspect-square active:scale-[0.97] transition-all cursor-pointer group shadow-sm"
        >
          <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:rotate-12 transition-transform">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Guided Scripture</h3>
            <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-widest mt-1">Explanation</p>
          </div>
        </div>

        {/* Guided Prayer - Themed Card */}
        <div 
          onClick={() => setActiveModal('prayer')}
          className="bg-indigo-50 dark:bg-indigo-950/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center justify-center space-y-4 aspect-square active:scale-[0.97] transition-all cursor-pointer group shadow-sm"
        >
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Guided Prayer</h3>
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest mt-1">Daily Focus</p>
          </div>
        </div>
      </div>

      {/* Full Screen Modals */}
      {activeModal === 'votd' && (
        <FullScreenView 
          onClose={() => setActiveModal(null)}
          title="Daily Verse"
          bgClass="bg-slate-950"
          footerActions={<ActionIcons iconClass="w-8 h-8 text-white" containerClass="flex items-center space-x-12" />}
        >
          <div className="flex flex-col items-center justify-center h-full text-center space-y-12">
            <div className="relative w-full aspect-[3/4] rounded-[64px] overflow-hidden shadow-2xl">
              <img src={votdData.img} className="absolute inset-0 w-full h-full object-cover" alt="VOTD" />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                <h2 className="text-4xl font-serif text-white leading-relaxed italic mb-8 drop-shadow-xl">"{votdData.verse}"</h2>
                <div className="w-16 h-1 bg-primary-400 rounded-full mb-6"></div>
                <span className="text-2xl font-bold text-white tracking-wide">{votdData.ref}</span>
              </div>
            </div>
          </div>
        </FullScreenView>
      )}

      {activeModal === 'scripture' && (
        <FullScreenView 
          onClose={() => setActiveModal(null)}
          title="Scripture Explanation"
          bgClass="bg-slate-50 dark:bg-slate-950"
        >
          {scriptureExplanation}
        </FullScreenView>
      )}

      {activeModal === 'prayer' && (
        <FullScreenView 
          onClose={() => setActiveModal(null)}
          title="Prayer Focus"
          bgClass="bg-indigo-50 dark:bg-indigo-950"
        >
          {prayerContent}
        </FullScreenView>
      )}
    </div>
  );
};

export default EngagementCards;
