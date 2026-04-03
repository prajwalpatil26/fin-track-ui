import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#6366f1', '#14b8a6', '#f43f5e', '#facc15', '#a855f7', '#ec4899'];

export const ExpenseChart: React.FC = () => {
  const { transactions } = useFinanceStore();

  const data = useMemo(() => {
    const expenses = transactions.filter(tx => tx.type === 'expense');
    const grouped: Record<string, number> = {};
    
    expenses.forEach(tx => {
      grouped[tx.category] = (grouped[tx.category] || 0) + tx.amount;
    });

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
          <div>
            <p className="text-text-main font-medium text-sm">{payload[0].name}</p>
            <p className="text-text-muted text-xs font-bold text-right">
              {formatCurrency(payload[0].value)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-[320px] md:h-[400px] flex flex-col" delay={4}>
      <h3 className="text-lg font-semibold text-text-main mb-2">Expenses by Category</h3>
      <div className="flex-1 w-full min-h-0 relative">
        {data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
            No expense data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', color: 'var(--color-text-main)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
