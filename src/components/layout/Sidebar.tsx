import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Wallet } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <Receipt size={20} /> },
    { id: 'insights', label: 'Insights', icon: <PieChart size={20} /> },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside 
        className={clsx(
          "fixed md:static inset-y-0 left-0 z-30 w-64 glass md:bg-transparent md:border-r border-border h-screen flex flex-col transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
            <Wallet size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-text-main to-text-muted">
            Fin<span className="text-finance-accent">Track</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsOpen(false);
              }}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                activeTab === tab.id 
                  ? "bg-finance-accent/10 text-finance-accent" 
                  : "text-text-muted hover:bg-slate-100 hover:text-text-main dark:hover:bg-slate-800"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};
