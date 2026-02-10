
import React from 'react';

interface Group {
  id: string;
  name: string;
  members: string;
  image: string;
  description: string;
}

const GROUPS: Group[] = [
  {
    id: '1',
    name: 'Home Cells (Nairobi West)',
    members: '150+ Members',
    image: 'https://picsum.photos/id/1060/400/250',
    description: 'Weekly small group gatherings for fellowship and prayer in various homes.'
  },
  {
    id: '2',
    name: 'Men of Valor',
    members: '80+ Members',
    image: 'https://picsum.photos/id/1016/400/250',
    description: 'Dedicated to building strong men of God through biblical mentorship.'
  },
  {
    id: '3',
    name: 'Women of Grace',
    members: '120+ Members',
    image: 'https://picsum.photos/id/1027/400/250',
    description: 'A vibrant community of women supporting each other in faith and life.'
  },
  {
    id: '4',
    name: 'The Youth Hub',
    members: '200+ Members',
    image: 'https://picsum.photos/id/1043/400/250',
    description: 'Dynamic worship and discussions for high school and university students.'
  }
];

const ChurchGroups: React.FC = () => {
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold">Find Your Group</h2>
        <button className="text-primary-600 text-xs font-bold uppercase tracking-wider">Filter</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {GROUPS.map((group) => (
          <div 
            key={group.id} 
            className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all"
          >
            <div className="relative h-40">
              <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full border border-white/30">
                  {group.members}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                {group.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                {group.description}
              </p>
              <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold text-sm active:bg-primary-600 active:text-white transition-all">
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary-600 text-white p-6 rounded-[32px] text-center mt-8">
        <h3 className="text-lg font-bold mb-2">Can't find a group?</h3>
        <p className="text-primary-100 text-sm mb-4">Talk to our pastors about starting a new home cell in your area.</p>
        <button className="px-6 py-2 bg-white text-primary-600 rounded-xl font-bold text-sm">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ChurchGroups;
