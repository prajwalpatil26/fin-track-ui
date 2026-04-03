import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';
import { subMonths, isSameMonth } from 'date-fns';

export const InsightsList: React.FC = () => {
  const { transactions } = useFinanceStore();

  const insights = useMemo(() => {
    // Highest spending category
    const expenses = transactions.filter(tx => tx.type === 'expense');
    const grouped: Record<string, number> = {};
    expenses.forEach(tx => {
      grouped[tx.category] = (grouped[tx.category] || 0) + tx.amount;
    });
    
    let highestCategory = '';
    let highestAmount = 0;
    Object.entries(grouped).forEach(([cat, amount]) => {
      if (amount > highestAmount) {
        highestAmount = amount;
        highestCategory = cat;
      }
    });

    // Monthly comparison
    const now = new Date();
    const currentMonthExpenses = expenses.filter(tx => isSameMonth(new Date(tx.date), now))
      .reduce((sum, tx) => sum + tx.amount, 0);
    const lastMonthExpenses = expenses.filter(tx => isSameMonth(new Date(tx.date), subMonths(now, 1)))
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expenseChange = lastMonthExpenses === 0 ? 0 : ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;
    
    // Total savings trend (Income - Expense for current month)
    const currentMonthIncome = transactions
      .filter(tx => tx.type === 'income' && isSameMonth(new Date(tx.date), now))
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    const currentSavings = currentMonthIncome - currentMonthExpenses;

    return [
      {
        title: 'Top Expense Category',
        value: highestCategory || 'N/A',
        subtitle: `${formatCurrency(highestAmount)} spent in total`,
        icon: <AlertCircle className="text-finance-warning" size={24} />,
        bg: 'bg-finance-warning/10',
        color: 'text-finance-warning'
      },
      {
        title: 'Monthly Expenses',
        value: formatCurrency(currentMonthExpenses),
        subtitle: `${Math.abs(expenseChange).toFixed(1)}% ${expenseChange > 0 ? 'increase' : 'decrease'} from last month`,
        icon: expenseChange > 0 ? <TrendingUp className="text-finance-danger" size={24} /> : <TrendingDown className="text-finance-success" size={24} />,
        bg: expenseChange > 0 ? 'bg-finance-danger/10' : 'bg-finance-success/10',
        color: expenseChange > 0 ? 'text-finance-danger' : 'text-finance-success'
      },
      {
        title: 'Monthly Savings',
        value: formatCurrency(currentSavings),
        subtitle: currentSavings >= 0 ? 'On track with savings goal' : 'Spending exceeds income this month',
        icon: <Target className="text-finance-accent" size={24} />,
        bg: 'bg-finance-accent/10',
        color: 'text-finance-accent'
      }
    ];
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map((insight, idx) => (
        <Card key={insight.title} delay={idx}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${insight.bg}`}>
              {insight.icon}
            </div>
          </div>
          <div>
            <h3 className="text-text-muted text-sm font-medium mb-1">{insight.title}</h3>
            <p className="text-2xl font-bold text-text-main mb-2 truncate">
              {insight.value}
            </p>
            <p className={`text-sm font-medium ${insight.color}`}>
              {insight.subtitle}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
