
import React from 'react';
import { Sermon } from '../types';

/**
 * MOCK_SERMONS Data
 * Centralized data for teaching resources.
 */
const MOCK_SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'Unsearchable Riches',
    speaker: 'Pastor John Kamau',
    date: 'Oct 22, 2023',
    category: 'Ephesians',
    thumbnail: 'https://picsum.photos/id/1011/400/225',
    description: 'Exploring the depths of God\'s love.'
  },
  {
    id: '2',
    title: 'Faith in the Fire',
    speaker: 'Pastor Sarah Wanjiru',
    date: 'Oct 15, 2023',
    category: 'Daniel',
    thumbnail: 'https://picsum.photos/id/1012/400/225',
    description: 'Remaining steadfast in a challenging world.'
  },
  {
    id: '3',
    title: 'Living by Grace',
    speaker: 'Elder David Mutua',
    date: 'Oct 08, 2023',
    category: 'Foundations',
    thumbnail: 'https://picsum.photos/id/1013/400/225',
    description: 'Salvation sustained by grace alone.'
  }
];

/**
 * Sermons Component
 * Renders a list of sermon cards optimized for vertical mobile scanning.
 */
const Sermons: React.FC = () => {
  return (
    <div className="px-4 py-6 space-y-6">
      {MOCK_SERMONS.map((sermon) => (
        <div 
          key={sermon.id} 
          className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all"
        >
          <div className="relative aspect-[16/9]">
            <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-3 left-3 bg-primary-600 text-[10px] text-white font-bold px-2 py-1 rounded-lg uppercase">
              {sermon.category}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight">{sermon.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">{sermon.speaker} • {sermon.date}</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 leading-relaxed">
              {sermon.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sermons;
