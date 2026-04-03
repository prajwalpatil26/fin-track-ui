import React from 'react';
import { QrCode, Send, Building2, UserPlus, CreditCard } from 'lucide-react';
import { Card } from '../ui/Card';

export const QuickActions: React.FC = () => {
  const actions = [
    { name: 'Scan QR', icon: <QrCode size={22} />, color: 'text-indigo-500', bg: 'bg-indigo-500/10 hover:bg-indigo-500/20' },
    { name: 'Pay Contact', icon: <Send size={22} />, color: 'text-teal-500', bg: 'bg-teal-500/10 hover:bg-teal-500/20' },
    { name: 'To Bank', icon: <Building2 size={22} />, color: 'text-rose-500', bg: 'bg-rose-500/10 hover:bg-rose-500/20' },
    { name: 'Self Transfer', icon: <UserPlus size={22} />, color: 'text-amber-500', bg: 'bg-amber-500/10 hover:bg-amber-500/20' },
    { name: 'Pay Bills', icon: <CreditCard size={22} />, color: 'text-purple-500', bg: 'bg-purple-500/10 hover:bg-purple-500/20' },
  ];

  return (
    <Card delay={2} className="mb-8">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-text-muted tracking-wide uppercase">UPI Quick Actions</h3>
      </div>
      <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
        {actions.map((action) => (
          <button 
            key={action.name}
            className={`flex-none w-[110px] md:w-auto flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 transform md:hover:scale-105 border border-border/40 hover:border-border cursor-pointer group shadow-sm hover:shadow-md snap-center ${action.bg}`}
          >
            <div className={`mb-3 transition-transform duration-300 group-hover:-translate-y-1 ${action.color}`}>
              {action.icon}
            </div>
            <span className="text-xs font-bold text-text-main text-center leading-tight">
              {action.name}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
};
