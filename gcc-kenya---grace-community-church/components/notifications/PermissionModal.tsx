
import React from 'react';

interface PermissionModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ isOpen, onAccept, onDecline }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600 dark:text-primary-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Stay in the loop</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
            Enable notifications to receive the latest sermons, church events, and devotionals directly on your device.
          </p>
          <div className="space-y-3">
            <button 
              onClick={onAccept}
              className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg shadow-primary-900/20 active:scale-95 transition-all"
            >
              Enable Notifications
            </button>
            <button 
              onClick={onDecline}
              className="w-full py-3 text-slate-400 dark:text-slate-500 font-bold text-sm active:opacity-50 transition-all"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
