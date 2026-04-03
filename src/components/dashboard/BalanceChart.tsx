import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinanceStore } from '../../store/useFinanceStore';
import { format, parseISO, subDays } from 'date-fns';
import { formatCurrency } from '../../utils/formatters';

export const BalanceChart: React.FC = () => {
  const { transactions, isDarkMode } = useFinanceStore();

  const data = useMemo(() => {
    // 1. Determine absolute current balance natively
    const totalBalance = transactions.reduce((acc, tx) => acc + (tx.type === 'income' ? tx.amount : -tx.amount), 0);

    const days = 30;
    const now = new Date();
    const timeline: Record<string, { income: number, expense: number }> = {};
    const dateList: string[] = [];

    // Initialize exactly 30 chronological buckets
    for (let i = days - 1; i >= 0; i--) {
      const key = format(subDays(now, i), 'MMM dd');
      timeline[key] = { income: 0, expense: 0 };
      dateList.push(key);
    }

    const thirtyDaysAgo = subDays(now, days);
    let netFlowIn30Days = 0;

    // Collate transactions into timeline
    transactions.forEach(tx => {
      const txDate = parseISO(tx.date);
      if (txDate >= thirtyDaysAgo) {
        const dateKey = format(txDate, 'MMM dd');
        if (timeline[dateKey]) {
          if (tx.type === 'income') {
            timeline[dateKey].income += tx.amount;
            netFlowIn30Days += tx.amount;
          } else {
            timeline[dateKey].expense += tx.amount;
            netFlowIn30Days -= tx.amount;
          }
        }
      }
    });

    // Start backwards mathematically from known End Balance
    let runningBalance = totalBalance - netFlowIn30Days;

    return dateList.map(date => {
      runningBalance += timeline[date].income - timeline[date].expense;
      return {
        date,
        balance: runningBalance
      };
    });
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card backdrop-blur-md border border-border p-3 rounded-xl shadow-2xl">
          <p className="text-text-muted text-xs mb-1 font-bold uppercase tracking-wider">{label}</p>
          <p className="text-finance-accent text-lg font-black tracking-tight">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-[320px] md:h-[400px] flex flex-col" delay={3}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-main">Wealth Trajectory</h3>
        <span className="flex items-center gap-2 text-xs font-semibold text-finance-success bg-finance-success/10 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-finance-success animate-pulse"></span>
          Live Sync
        </span>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `₹${value >= 100000 ? (value / 100000).toFixed(1) + 'L' : value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorBalance)"
              strokeWidth={3}
              activeDot={{ r: 6, fill: '#6366f1', stroke: 'var(--color-card)', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
