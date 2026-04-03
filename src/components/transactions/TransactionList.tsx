import React, { useState, useMemo } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import type { Transaction } from '../../types';
import { TransactionFormModal } from './TransactionFormModal';
import { Card } from '../ui/Card';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Search, Filter, ArrowUpDown, Pencil, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const TransactionList: React.FC = () => {
  const { transactions, role, deleteTransaction } = useFinanceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<'all' | '7days' | '30days'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: 'date' | 'amount', direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(transactions.map(t => t.category))).sort();
  }, [transactions]);

  const filteredAndSorted = useMemo(() => {
    let result = [...transactions];

    if (typeFilter !== 'all') {
      result = result.filter(tx => tx.type === typeFilter);
    }

    if (dateRangeFilter !== 'all') {
      const cutoff = new Date();
      if (dateRangeFilter === '7days') cutoff.setDate(cutoff.getDate() - 7);
      if (dateRangeFilter === '30days') cutoff.setDate(cutoff.getDate() - 30);
      result = result.filter(tx => new Date(tx.date) >= cutoff);
    }

    if (categoryFilter !== 'all') {
      result = result.filter(tx => tx.category === categoryFilter);
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(tx => 
        tx.category.toLowerCase().includes(lowerTerm) || 
        tx.amount.toString().includes(lowerTerm)
      );
    }

    result.sort((a, b) => {
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
    });

    return result;
  }, [transactions, typeFilter, dateRangeFilter, categoryFilter, searchTerm, sortConfig]);

  const handleSort = (key: 'date' | 'amount') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
      toast.success('Transaction deleted');
    }
  };

  const openAddModal = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  return (
    <Card className="min-h-[500px]" delay={1}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-text-main">Recent Transactions</h2>
        {role === 'admin' && (
          <button 
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 bg-finance-accent hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium shadow-sm"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search by category or amount..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-finance-accent/50 text-text-main"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as any)}
              className="pl-9 pr-8 py-2 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-finance-accent/50 text-text-main cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          
          <div className="relative">
            <select
              value={dateRangeFilter}
              onChange={e => setDateRangeFilter(e.target.value as any)}
              className="pl-4 pr-8 py-2 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-finance-accent/50 text-text-main cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="pl-4 pr-8 py-2 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-finance-accent/50 text-text-main cursor-pointer max-w-[150px] truncate"
            >
              <option value="all">Categories</option>
              {uniqueCategories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-text-muted">
              <th className="pb-3 font-medium cursor-pointer hover:text-text-main transition-colors" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1">Date <ArrowUpDown size={12} /></div>
              </th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium text-right cursor-pointer hover:text-text-main transition-colors" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end gap-1">Amount <ArrowUpDown size={12} /></div>
              </th>
              {role === 'admin' && <th className="pb-3 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-text-muted text-sm">
                  {transactions.length === 0 ? 'No transactions found. Add one to get started!' : 'No transactions match your search.'}
                </td>
              </tr>
            ) : (
              filteredAndSorted.map((tx) => (
                <tr key={tx.id} className="border-b border-border/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="py-4 text-sm text-text-main">{formatDate(tx.date)}</td>
                  <td className="py-4 text-sm font-medium text-text-main">{tx.category}</td>
                  <td className="py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tx.type === 'income' ? 'bg-finance-success/10 text-finance-success' : 'bg-finance-danger/10 text-finance-danger'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 text-sm font-bold text-right text-text-main">{formatCurrency(tx.amount)}</td>
                  {role === 'admin' && (
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditModal(tx)}
                          className="p-1.5 text-text-muted hover:text-finance-accent hover:bg-finance-accent/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 text-text-muted hover:text-finance-danger hover:bg-finance-danger/10 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TransactionFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transaction={editingTx} 
      />
    </Card>
  );
};
