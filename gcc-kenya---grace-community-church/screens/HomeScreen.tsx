
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import TopBar from '../components/home/TopBar';
import EngagementCards from '../components/home/EngagementCards';
import EventSection from '../components/home/EventSection';
import ChurchGroups from '../components/community/ChurchGroups';
import NotificationModal from '../components/notifications/NotificationModal';
import PermissionModal from '../components/notifications/PermissionModal';
import { AppNotification } from '../types';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: 'New Sermon Uploaded',
    message: 'Pastor John Kamau just uploaded "The Unsearchable Riches of Christ". Watch it now!',
    time: '2h ago',
    isRead: false,
    type: 'sermon'
  },
  {
    id: '2',
    title: 'Sunday Service Reminder',
    message: 'Join us tomorrow at 9:00 AM for our morning worship service.',
    time: '5h ago',
    isRead: false,
    type: 'event'
  }
];

const HomeScreen: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'today' | 'community'>('today');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showPermission, setShowPermission] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    const perm = localStorage.getItem('notifications_allowed');
    if (perm === null) {
      const timer = setTimeout(() => setShowPermission(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleAllowNotifications = () => {
    localStorage.setItem('notifications_allowed', 'true');
    setShowPermission(false);
  };

  const handleDeclineNotifications = () => {
    localStorage.setItem('notifications_allowed', 'false');
    setShowPermission(false);
  };

  const hasUnread = notifications.some(n => !n.isRead);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-20">
      <TopBar 
        onOpenNotifications={() => setIsNotifOpen(true)} 
        hasUnread={hasUnread}
      />

      {/* Sub-tabs Switcher */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="flex px-4 py-2 space-x-6">
          <button 
            onClick={() => setActiveSubTab('today')}
            className={`py-2 text-base font-bold transition-all relative ${
              activeSubTab === 'today' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'
            }`}
          >
            Today
            {activeSubTab === 'today' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveSubTab('community')}
            className={`py-2 text-base font-bold transition-all relative ${
              activeSubTab === 'community' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'
            }`}
          >
            Community
            {activeSubTab === 'community' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {activeSubTab === 'today' ? (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300 space-y-8 pb-10">
          <Hero />
          
          {/* Engagement Cards Section */}
          <EngagementCards />

          {/* Welcome Card Section */}
          <div className="px-4">
            <section className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <span className="text-primary-600 font-bold tracking-widest uppercase text-[10px] mb-2 block">Welcome</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">A Grace-Filled Community</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Welcome to Grace Community Church Kenya. We are a family of believers in Nairobi dedicated to the transforming power of the Gospel. Join us as we grow together in Christ.
              </p>
            </section>
          </div>

          {/* Event Section */}
          <EventSection />

          {/* Next Service Section */}
          <div className="px-4">
            <section className="space-y-4">
              <h3 className="text-xl font-bold px-2">Next Service</h3>
              <div className="bg-slate-900 text-white p-8 rounded-[40px] relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <p className="text-primary-400 font-bold text-xs uppercase tracking-widest mb-1">Sunday Morning</p>
                <p className="text-3xl font-bold mb-6">9:00 AM & 11:00 AM</p>
                <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl text-sm font-bold shadow-lg active:scale-95 transition-all">
                  Get Directions
                </button>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <ChurchGroups />
        </div>
      )}

      <NotificationModal 
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onMarkRead={handleMarkRead}
      />

      <PermissionModal 
        isOpen={showPermission}
        onAccept={handleAllowNotifications}
        onDecline={handleDeclineNotifications}
      />
    </div>
  );
};

export default HomeScreen;
