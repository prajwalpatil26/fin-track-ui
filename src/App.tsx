import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceChart } from './components/dashboard/BalanceChart';
import { ExpenseChart } from './components/dashboard/ExpenseChart';
import { QuickActions } from './components/dashboard/QuickActions';
import { TransactionList } from './components/transactions/TransactionList';
import { InsightsList } from './components/insights/InsightsList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-6">
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-main">
                  Financial <span className="bg-clip-text text-transparent bg-gradient-to-r from-finance-accent to-purple-500">Overview</span>
                </h1>
                <p className="text-text-muted mt-2 font-medium">Your wealth management dashboard. Engineered for Bharat.</p>
              </div>
            </div>
            <QuickActions />
            <SummaryCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BalanceChart />
              </div>
              <div className="lg:col-span-1">
                <ExpenseChart />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'transactions' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TransactionList />
          </div>
        )}
        
        {activeTab === 'insights' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold mb-6 text-text-main">Financial Insights</h1>
            <InsightsList />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
