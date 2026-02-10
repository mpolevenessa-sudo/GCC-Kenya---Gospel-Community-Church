
import React, { useState, useEffect, useRef } from 'react';
import { BibleBook, BibleVersion, BibleVerse } from '../types';
import { geminiService } from '../services/gemini';

const OT_BOOKS: BibleBook[] = [
  { name: 'Genesis', chapters: 50 }, { name: 'Exodus', chapters: 40 }, { name: 'Leviticus', chapters: 27 },
  { name: 'Numbers', chapters: 36 }, { name: 'Deuteronomy', chapters: 34 }, { name: 'Joshua', chapters: 24 },
  { name: 'Judges', chapters: 21 }, { name: 'Ruth', chapters: 4 }, { name: '1 Samuel', chapters: 31 },
  { name: '2 Samuel', chapters: 24 }, { name: '1 Kings', chapters: 22 }, { name: '2 Kings', chapters: 25 },
  { name: '1 Chronicles', chapters: 29 }, { name: '2 Chronicles', chapters: 36 }, { name: 'Ezra', chapters: 10 },
  { name: 'Nehemiah', chapters: 13 }, { name: 'Esther', chapters: 10 }, { name: 'Job', chapters: 42 },
  { name: 'Psalms', chapters: 150 }, { name: 'Proverbs', chapters: 31 }, { name: 'Ecclesiastes', chapters: 12 },
  { name: 'Song of Solomon', chapters: 8 }, { name: 'Isaiah', chapters: 66 }, { name: 'Jeremiah', chapters: 52 },
  { name: 'Lamentations', chapters: 5 }, { name: 'Ezekiel', chapters: 48 }, { name: 'Daniel', chapters: 12 },
  { name: 'Hosea', chapters: 14 }, { name: 'Joel', chapters: 3 }, { name: 'Amos', chapters: 9 },
  { name: 'Obadiah', chapters: 1 }, { name: 'Jonah', chapters: 4 }, { name: 'Micah', chapters: 7 },
  { name: 'Nahum', chapters: 3 }, { name: 'Habakkuk', chapters: 3 }, { name: 'Zephaniah', chapters: 3 },
  { name: 'Haggai', chapters: 2 }, { name: 'Zechariah', chapters: 14 }, { name: 'Malachi', chapters: 4 }
];

const NT_BOOKS: BibleBook[] = [
  { name: 'Matthew', chapters: 28 }, { name: 'Mark', chapters: 16 }, { name: 'Luke', chapters: 24 },
  { name: 'John', chapters: 21 }, { name: 'Acts', chapters: 28 }, { name: 'Romans', chapters: 16 },
  { name: '1 Corinthians', chapters: 16 }, { name: '2 Corinthians', chapters: 13 }, { name: 'Galatians', chapters: 6 },
  { name: 'Ephesians', chapters: 6 }, { name: 'Philippians', chapters: 4 }, { name: 'Colossians', chapters: 4 },
  { name: '1 Thessalonians', chapters: 5 }, { name: '2 Thessalonians', chapters: 3 }, { name: '1 Timothy', chapters: 6 },
  { name: '2 Timothy', chapters: 4 }, { name: 'Titus', chapters: 3 }, { name: 'Philemon', chapters: 1 },
  { name: 'Hebrews', chapters: 13 }, { name: 'James', chapters: 5 }, { name: '1 Peter', chapters: 5 },
  { name: '2 Peter', chapters: 3 }, { name: '1 John', chapters: 5 }, { name: '2 John', chapters: 1 },
  { name: '3 John', chapters: 1 }, { name: 'Jude', chapters: 1 }, { name: 'Revelation', chapters: 22 }
];

const BibleScreen: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(OT_BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [version, setVersion] = useState<BibleVersion>('NIV');
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBookPicker, setShowBookPicker] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChapter();
    // Prefetch next chapter for "instant" feel
    if (selectedChapter < selectedBook.chapters) {
      geminiService.fetchBibleVerses(selectedBook.name, selectedChapter + 1, version);
    }
  }, [selectedBook, selectedChapter, version]);

  const loadChapter = async () => {
    // Note: GeminiService.fetchBibleVerses now handles internal caching
    setLoading(true);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    const data = await geminiService.fetchBibleVerses(selectedBook.name, selectedChapter, version);
    setVerses(data);
    setLoading(false);
  };

  const handleBookSelect = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setShowBookPicker(false);
  };

  const handleShare = (verse: BibleVerse) => {
    const text = `"${verse.text}" - ${selectedBook.name} ${selectedChapter}:${verse.number} (${version})`;
    if (navigator.share) {
      navigator.share({ title: 'GCC Kenya Scripture', text: text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    }
  };

  return (
    <div className="relative h-[calc(100vh-120px)] flex flex-col overflow-hidden bg-white dark:bg-slate-950">
      {/* Persistent Sticky Header */}
      <header className="shrink-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between shadow-sm">
        <button 
          onClick={() => setShowBookPicker(true)}
          className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl font-black text-sm active:scale-95 transition-all"
        >
          <span className="text-primary-600 dark:text-primary-400">{selectedBook.name} {selectedChapter}</span>
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
        </button>

        <select 
          value={version}
          onChange={(e) => setVersion(e.target.value as BibleVersion)}
          className="bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 font-black text-slate-600 dark:text-slate-300 text-xs outline-none border-none active:scale-95 transition-transform"
        >
          <option value="NIV">NIV</option>
          <option value="KJV">KJV</option>
          <option value="ESV">ESV</option>
          <option value="NKJV">NKJV</option>
        </select>
      </header>

      {/* Main Content Area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar scroll-smooth p-6 pb-32 space-y-8"
      >
        {loading ? (
          <div className="space-y-10 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex space-x-4">
                <div className="w-6 h-4 bg-slate-100 dark:bg-slate-900 rounded-md shrink-0"></div>
                <div className="space-y-3 flex-1">
                  <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-full w-full"></div>
                  <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-full w-[90%]"></div>
                  {i % 2 === 0 && <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-full w-[60%]"></div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="text-center py-8">
                <h1 className="text-4xl font-serif font-black text-slate-900 dark:text-white tracking-tight">{selectedBook.name}</h1>
                <div className="inline-flex items-center space-x-2 mt-4">
                    <span className="h-px w-8 bg-primary-500/30"></span>
                    <p className="text-xs font-black tracking-[0.4em] uppercase text-primary-500">Chapter {selectedChapter}</p>
                    <span className="h-px w-8 bg-primary-500/30"></span>
                </div>
            </div>
            {verses.map((v) => (
              <div 
                key={v.number} 
                onClick={() => handleShare(v)}
                className="group relative flex space-x-5 items-start cursor-pointer active:opacity-50 transition-opacity p-2 -m-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50"
              >
                <span className="text-[11px] font-black text-primary-500/40 mt-1.5 shrink-0 w-5 text-right font-mono">{v.number}</span>
                <p className="text-slate-800 dark:text-slate-100 leading-[1.8] text-xl font-serif flex-1 antialiased">
                  {v.text}
                </p>
                <div className="opacity-0 group-hover:opacity-100 shrink-0 mt-1.5 text-slate-300 transition-opacity">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Floating Instant Navigator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-[340px] px-4 pointer-events-none">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-[32px] shadow-2xl p-2 flex items-center justify-between pointer-events-auto ring-1 ring-black/[0.05]">
          <button 
            disabled={selectedChapter <= 1 || loading}
            onClick={() => setSelectedChapter(prev => prev - 1)}
            className="w-14 h-14 flex items-center justify-center rounded-[24px] bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white disabled:opacity-20 active:scale-90 transition-all border border-slate-200/50 dark:border-slate-700/50"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="flex flex-col items-center px-4">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Passage</span>
            <span className="text-base font-black text-slate-900 dark:text-white leading-none">{selectedChapter} / {selectedBook.chapters}</span>
          </div>

          <button 
            disabled={selectedChapter >= selectedBook.chapters || loading}
            onClick={() => setSelectedChapter(prev => prev + 1)}
            className="w-14 h-14 flex items-center justify-center rounded-[24px] bg-primary-600 text-white shadow-xl shadow-primary-500/30 disabled:opacity-20 active:scale-90 transition-all"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Book Picker Modal */}
      {showBookPicker && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col animate-in slide-in-from-bottom duration-500 ease-out">
          <header className="px-6 h-20 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-950 sticky top-0">
            <div>
                <h2 className="font-black text-2xl tracking-tight">Library</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Old & New Testament</p>
            </div>
            <button onClick={() => setShowBookPicker(false)} className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-2xl active:scale-90 transition-transform">
              <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>
          
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-10 no-scrollbar pb-32">
            {[ { title: 'Old Testament', books: OT_BOOKS }, { title: 'New Testament', books: NT_BOOKS }].map((section) => (
                <section key={section.title}>
                    <div className="flex items-center space-x-4 mb-6">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-500">{section.title}</h3>
                        <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {section.books.map(b => (
                            <button 
                                key={b.name}
                                onClick={() => handleBookSelect(b)}
                                className={`group p-5 rounded-[28px] text-sm font-black text-left transition-all border ${
                                    selectedBook.name === b.name 
                                    ? 'bg-primary-600 border-primary-500 text-white shadow-2xl shadow-primary-500/40 ring-4 ring-primary-500/10' 
                                    : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-500/50 active:scale-95'
                                }`}
                            >
                                <span className="block opacity-40 text-[9px] mb-1 font-mono uppercase tracking-widest">Book</span>
                                <span className="text-base truncate block">{b.name}</span>
                            </button>
                        ))}
                    </div>
                </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleScreen;
