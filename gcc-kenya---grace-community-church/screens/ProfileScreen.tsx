
import React from 'react';
import ThemeToggle from '../components/ThemeToggle';

/**
 * ProfileScreen Module
 * Handles user profile info and app settings like Appearance.
 */
const ProfileScreen: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-20 px-4 py-6">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center text-primary-600 dark:text-primary-400 text-3xl font-bold mb-4">
          JD
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">John Doe</h2>
        <p className="text-slate-500 text-sm">Member since 2021</p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 px-2">Account</h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 active:bg-slate-50 dark:active:bg-slate-800">
              <span className="text-sm font-medium">Personal Information</span>
              <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-slate-800">
              <span className="text-sm font-medium">Donation History</span>
              <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 px-2">Settings</h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Appearance</p>
                <p className="text-[10px] text-slate-500">Light, Dark, or System mode</p>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium">Notifications</span>
              <div className="w-10 h-6 bg-primary-600 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-red-500 font-bold rounded-2xl active:bg-slate-200 dark:active:bg-slate-700 transition-colors">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
