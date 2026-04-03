import type { Transaction } from '../types';
import { subDays, format } from 'date-fns';

export const generateMockTransactions = (): Transaction[] => {
  const categories = {
    expense: ['Groceries (Zepto/Blinkit)', 'Rent/EMI', 'Internet & Bills', 'Food Delivery (Swiggy)', 'Transport (Uber/Ola)', 'UPI Payments'],
    income: ['Monthly Salary', 'Freelance Projects', 'Dividend / SIP Returns', 'Cashback & Rewards'],
  };

  const transactions: Transaction[] = [];
  const now = new Date();

  for (let i = 0; i < 50; i++) {
    const isIncome = Math.random() > 0.7;
    const type = isIncome ? 'income' : 'expense';
    const categoryList = categories[type];
    const category = categoryList[Math.floor(Math.random() * categoryList.length)];
    
    // Amount ranges localized for standard middle-class tier INR
    let amount = 0;
    if (type === 'income') {
      amount = Math.floor(Math.random() * 95000) + 25000; // 25k to 1.2L INR
    } else {
      amount = category === 'Rent/EMI' 
        ? Math.floor(Math.random() * 25000) + 12000 // 12k to 37k INR
        : Math.floor(Math.random() * 4500) + 150; // 150 to 4.6k INR
    }

    const date = subDays(now, Math.floor(Math.random() * 60));

    transactions.push({
      id: `tx-${Math.random().toString(36).substr(2, 9)}`,
      date: format(date, 'yyyy-MM-dd'),
      amount,
      category,
      type,
      description: `${category} transaction`,
    });
  }

  // Sort by newest first
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
