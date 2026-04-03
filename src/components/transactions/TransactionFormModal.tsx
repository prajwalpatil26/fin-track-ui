import React, { useState, useEffect } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import type { Transaction } from '../../types';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

export const TransactionFormModal: React.FC<Props> = ({ isOpen, onClose, transaction }) => {
  const { addTransaction, updateTransaction } = useFinanceStore();
  
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'income' | 'expense',
    description: '',
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount.toString(),
        category: transaction.category,
        date: transaction.date,
        type: transaction.type,
        description: transaction.description || '',
      });
    } else {
      setFormData({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        description: '',
      });
    }
  }, [transaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) {
      toast.error('Please fill securely all fields');
      return;
    }

    const payload = {
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      type: formData.type,
      description: formData.description,
    };

    if (transaction) {
      updateTransaction(transaction.id, payload);
      toast.success('Transaction updated!');
    } else {
      addTransaction(payload);
      toast.success('Transaction added!');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-xl font-bold text-text-main">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-text-muted transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`py-2 rounded-xl border text-sm font-medium transition-colors ${formData.type === 'expense' ? 'bg-finance-danger/10 border-finance-danger/20 text-finance-danger' : 'border-border text-text-muted hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`py-2 rounded-xl border text-sm font-medium transition-colors ${formData.type === 'income' ? 'bg-finance-success/10 border-finance-success/20 text-finance-success' : 'border-border text-text-muted hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              Income
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Amount</label>
            <input
              type="number"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-finance-accent/50"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-finance-accent/50"
              placeholder="e.g. Groceries"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-finance-accent/50"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl font-medium border border-border text-text-main hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl font-medium bg-finance-accent text-white hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
