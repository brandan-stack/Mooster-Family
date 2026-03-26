'use client';

import { Transaction } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';

interface TransactionListProps {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function TransactionList({ transactions, onRemove }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-400">
        <p className="text-lg">No transactions yet.</p>
        <p className="text-sm mt-1">Add your first transaction above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {transactions.map(t => (
          <li key={t.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                    t.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <p className="font-medium text-gray-800 truncate">{t.description}</p>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 pl-4">
                {t.category} · {formatDate(t.date)}
              </p>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <span
                className={`font-semibold ${
                  t.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
              <button
                onClick={() => onRemove(t.id)}
                aria-label={`Remove ${t.description}`}
                className="text-gray-300 hover:text-red-500 transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
