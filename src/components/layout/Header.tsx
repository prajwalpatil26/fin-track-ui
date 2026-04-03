import { Menu, Sun, Moon, Shield, Bell } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { toggleDarkMode, isDarkMode, role, setRole } = useFinanceStore();

  return (
    <header className="h-20 border-b border-border bg-card/60 backdrop-blur-2xl sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 transition-colors">
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <Menu size={22} />
        </button>
        <div className="hidden md:block">
          <h2 className="text-lg font-bold text-text-main tracking-tight">Good Morning, Prajwal Patil 👋</h2>
          <p className="text-xs text-text-muted font-medium mt-0.5">Welcome back to your financial command center.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden min-[400px]:flex items-center bg-slate-200/80 dark:bg-slate-900/50 rounded-xl p-1 shadow-inner border border-black/5 dark:border-white/5">
          <button
            onClick={() => setRole('viewer')}
            className={`px-3 md:px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
              role === 'viewer' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`px-3 md:px-4 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all duration-300 ${
               role === 'admin' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Shield size={14} />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>

        <button className="relative p-2.5 text-text-muted hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all hover:scale-105 active:scale-95">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-card box-content animate-pulse"></span>
        </button>

        <button 
          onClick={toggleDarkMode}
          className="p-2.5 text-text-muted hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all hover:scale-105 active:scale-95"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="h-10 w-10 ml-2 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer hover:ring-2 ring-offset-2 ring-offset-background ring-indigo-500 transition-all hover:scale-105">
          PP
        </div>
      </div>
    </header>
  );
};
