import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export const SummaryCards: React.FC = () => {
  const { transactions } = useFinanceStore();

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    transactions.forEach(tx => {
      if (tx.type === 'income') inc += tx.amount;
      else exp += tx.amount;
    });
    return {
      totalIncome: inc,
      totalExpense: exp,
      balance: inc - exp
    };
  }, [transactions]);

  // Mocking trend percentages for UI purposes
  const balanceTrend = 12.5; 
  const incomeTrend = 8.2;
  const expenseTrend = -4.1;

  const cards = [
    {
      title: 'Total Balance',
      amount: balance,
      trend: balanceTrend,
      icon: <Wallet className="text-white" size={24} />,
      bg: 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20',
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      trend: incomeTrend,
      icon: <TrendingUp className="text-white" size={24} />,
      bg: 'bg-gradient-to-br from-teal-400 to-emerald-500 shadow-lg shadow-teal-500/20',
    },
    {
      title: 'Total Expenses',
      amount: totalExpense,
      trend: expenseTrend,
      icon: <TrendingDown className="text-white" size={24} />,
      bg: 'bg-gradient-to-br from-rose-400 to-red-500 shadow-lg shadow-rose-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <Card key={card.title} delay={idx}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-muted tracking-wide uppercase">{card.title}</h3>
            <div className={`p-2.5 rounded-2xl ${card.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              {card.icon}
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-text-main to-text-muted mb-2 drop-shadow-sm">
              {formatCurrency(card.amount)}
            </div>
            <div className={`flex items-center text-sm font-bold ${card.trend > 0 ? 'text-finance-success' : 'text-finance-danger'}`}>
              <div className={`p-1 rounded-full mr-2 ${card.trend > 0 ? 'bg-finance-success/20' : 'bg-finance-danger/20'}`}>
                 {card.trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
              <span>{formatPercentage(card.trend)}</span>
              <span className="text-text-muted font-medium ml-2 whitespace-nowrap hidden sm:inline-block"> from last month</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
