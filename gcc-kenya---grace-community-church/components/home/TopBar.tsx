
import React, { useState, useEffect } from 'react';

/**
 * TopBar Component
 * Displays the engagement streak and the notification bell.
 */
interface TopBarProps {
  onOpenNotifications: () => void;
  hasUnread: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onOpenNotifications, hasUnread }) => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const updateStreak = () => {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('last_visit_date');
      const savedStreak = parseInt(localStorage.getItem('user_streak') || '0', 10);
      
      if (lastVisit === today) {
        setStreak(savedStreak || 1);
        return;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastVisit === yesterday.toDateString()) {
        const newStreak = savedStreak + 1;
        localStorage.setItem('user_streak', newStreak.toString());
        setStreak(newStreak);
      } else {
        localStorage.setItem('user_streak', '1');
        setStreak(1);
      }
      localStorage.setItem('last_visit_date', today);
    };

    updateStreak();
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      {/* Streak Counter */}
      <div className="flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-2xl border border-primary-100 dark:border-primary-800/30">
        <span className="text-xl">🔥</span>
        <span className="font-bold text-primary-600 dark:text-primary-400 text-sm">{streak} Day Streak</span>
      </div>

      {/* Notification Bell */}
      <button 
        onClick={onOpenNotifications}
        className="relative w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full active:scale-90 transition-transform"
      >
        <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {hasUnread && (
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
        )}
      </button>
    </div>
  );
};

export default TopBar;
