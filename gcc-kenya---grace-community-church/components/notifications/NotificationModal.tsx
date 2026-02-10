
import React from 'react';
import { AppNotification } from '../../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, notifications, onMarkRead }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white dark:bg-slate-950 animate-in slide-in-from-bottom duration-300">
      <header className="px-4 h-14 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-600 dark:text-slate-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="font-bold text-lg">Notifications</h2>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-sm">All caught up!</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id}
              onClick={() => onMarkRead(n.id)}
              className={`p-4 rounded-2xl border transition-all ${
                n.isRead 
                  ? 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800' 
                  : 'bg-white dark:bg-slate-800 border-primary-200 dark:border-primary-900/50 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={`text-sm font-bold ${n.isRead ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                  {n.title}
                </h3>
                <span className="text-[10px] text-slate-400">{n.time}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {n.message}
              </p>
              {!n.isRead && (
                <div className="mt-2 flex items-center text-[10px] font-bold text-primary-500 uppercase tracking-tighter">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-1.5"></span>
                  New
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
