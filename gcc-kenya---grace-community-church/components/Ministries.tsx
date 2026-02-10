
import React from 'react';
import { Ministry } from '../types';

/**
 * MINISTRIES Data
 * Defining church ministry divisions.
 */
const MINISTRIES: Ministry[] = [
  {
    id: '1',
    name: 'Children',
    description: 'Building biblical foundations for kids.',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
  },
  {
    id: '2',
    name: 'Youth',
    description: 'Empowering teens to live for Christ.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    id: '3',
    name: 'Missions',
    description: 'Reaching the ends of the earth.',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
];

/**
 * Ministries Component
 * Horizontal or list-based view of ministries for mobile.
 */
const Ministries: React.FC = () => {
  return (
    <div className="px-4 py-6 grid grid-cols-1 gap-4">
      {MINISTRIES.map((m) => (
        <div 
          key={m.id} 
          className="flex items-center p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm active:bg-slate-50 dark:active:bg-slate-800/50 transition-all"
        >
          <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mr-5 shrink-0">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={m.icon} />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{m.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{m.description}</p>
          </div>
          <div className="ml-auto text-slate-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ministries;
