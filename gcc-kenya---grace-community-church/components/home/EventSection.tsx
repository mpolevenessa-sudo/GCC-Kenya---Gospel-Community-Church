
import React from 'react';

const EVENTS = [
  {
    id: '1',
    title: 'Grace Youth Retreat',
    date: 'Dec 15-17',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400',
    tag: 'Youth'
  },
  {
    id: '2',
    title: 'Christmas Carols Night',
    date: 'Dec 24, 6PM',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=400',
    tag: 'Worship'
  },
  {
    id: '3',
    title: 'New Year Kesha',
    date: 'Dec 31, 9PM',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&q=80&w=400',
    tag: 'Special'
  }
];

const EventSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center px-6">
        <h3 className="text-xl font-bold">Upcoming Events</h3>
      </div>
      <div className="flex overflow-x-auto pb-4 px-4 space-x-4 no-scrollbar scroll-smooth">
        {EVENTS.map((event) => (
          <div key={event.id} className="shrink-0 w-64 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm active:scale-95 transition-all cursor-grab active:cursor-grabbing">
            <div className="h-32 relative">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-full border border-white/30 uppercase">
                  {event.tag}
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-primary-600 font-bold text-[10px] uppercase tracking-wider mb-1">{event.date}</p>
              <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{event.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSection;
