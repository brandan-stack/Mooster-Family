'use client';

import { useState } from 'react';
import { useBudget } from '@/hooks/useBudget';
import TransactionForm from '@/components/TransactionForm';
import SummaryCards from '@/components/SummaryCards';
import TransactionList from '@/components/TransactionList';

export default function Home() {
  const {
    transactions,
    totalIncome,
    totalExpenses,
    netBalance,
    addTransaction,
    removeTransaction,
    clearCache,
    isLoaded,
  } = useBudget();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearCache = () => {
    clearCache();
    setShowClearConfirm(false);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mooster Family Budget</h1>
          <p className="text-gray-500 text-sm mt-1">Track your family finances</p>
        </div>
        <button
          onClick={() => setShowClearConfirm(true)}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors border border-gray-200 hover:border-red-300 rounded-lg px-3 py-1.5"
        >
          Clear Cache
        </button>
      </div>

      {showClearConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm clear cache"
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear All Data?</h3>
            <p className="text-gray-500 text-sm mb-4">
              This will delete all transactions and clear the app cache. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearCache}
                className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {isLoaded && (
          <SummaryCards
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netBalance={netBalance}
          />
        )}
        <TransactionForm onAdd={addTransaction} />
        {isLoaded && (
          <TransactionList
            transactions={transactions}
            onRemove={removeTransaction}
          />
        )}
      </div>
    </main>
  );
}
