import { create } from 'zustand';
import type { Transaction, Role } from '../types';
import { generateMockTransactions } from '../utils/mockData';

interface FinanceState {
  transactions: Transaction[];
  role: Role;
  isDarkMode: boolean;
  
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  toggleDarkMode: () => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: generateMockTransactions(),
  role: 'admin',
  isDarkMode: localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
  
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [
        { ...tx, id: `tx-${Math.random().toString(36).substr(2, 9)}` },
        ...state.transactions,
      ],
    })),
    
  updateTransaction: (id, updatedTx) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === id ? { ...tx, ...updatedTx } : tx
      ),
    })),
    
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.id !== id),
    })),
    
  setRole: (role) => set({ role }),
  
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return { isDarkMode: newMode };
    }),
}));
