
import React, { useState } from 'react';
import Sermons from '../components/Sermons';
import Ministries from '../components/Ministries';

/**
 * DiscoverScreen Module
 * Hosts Sermons and Ministries in a unified view.
 */
const DiscoverScreen: React.FC = () => {
  const [subTab, setSubTab] = useState<'sermons' | 'ministries'>('sermons');

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-20">
      <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button 
            onClick={() => setSubTab('sermons')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              subTab === 'sermons' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400' : 'text-slate-500'
            }`}
          >
            Sermons
          </button>
          <button 
            onClick={() => setSubTab('ministries')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              subTab === 'ministries' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400' : 'text-slate-500'
            }`}
          >
            Ministries
          </button>
        </div>
      </div>
      
      <div className="py-2">
        {subTab === 'sermons' ? (
          <div>
            <div className="px-4 py-2">
              <h2 className="text-xl font-bold">Latest Media</h2>
              <p className="text-xs text-slate-500">Video teachings from the pulpit</p>
            </div>
            <Sermons />
          </div>
        ) : (
          <div>
            <div className="px-4 py-2">
              <h2 className="text-xl font-bold">Our Ministries</h2>
              <p className="text-xs text-slate-500">Ways to serve and grow together</p>
            </div>
            <Ministries />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverScreen;
