
import React from 'react';

/**
 * PlansScreen Module
 * Displays reading plans and upcoming events.
 */
const PlansScreen: React.FC = () => {
  const plans = [
    { title: '30 Days of Prayer', days: '12/30', type: 'Spiritual' },
    { title: 'Building Foundations', days: '2/7', type: 'Theology' },
    { title: 'Youth Retreat Prep', days: '0/5', type: 'Event' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-20 px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Spiritual Plans</h2>
      
      <div className="space-y-4 mb-10">
        {plans.map((plan, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-primary-500 tracking-tighter">{plan.type}</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{plan.title}</h3>
              <p className="text-xs text-slate-500">Day {plan.days} completed</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" /></svg>
            </button>
          </div>
        ))}
        
        <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 font-bold text-sm hover:border-primary-500 hover:text-primary-500 transition-all">
          + Start New Plan
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-primary-400 font-bold text-xs uppercase tracking-widest mb-1">Dec 15, 2023</p>
          <h3 className="text-xl font-bold mb-2">Grace Christmas Gala</h3>
          <p className="text-slate-400 text-sm mb-4">A night of worship and fellowship as we celebrate the birth of our King.</p>
          <button className="px-6 py-2 bg-white text-slate-900 rounded-xl text-sm font-bold">Register Now</button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      </div>
    </div>
  );
};

export default PlansScreen;
