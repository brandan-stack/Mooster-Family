import { formatCurrency } from '@/utils/currency';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}

export default function SummaryCards({ totalIncome, totalExpenses, netBalance }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <p className="text-sm text-green-600 font-medium">Total Income</p>
        <p className="text-2xl font-bold text-green-700 mt-1">{formatCurrency(totalIncome)}</p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <p className="text-sm text-red-600 font-medium">Total Expenses</p>
        <p className="text-2xl font-bold text-red-700 mt-1">{formatCurrency(totalExpenses)}</p>
      </div>
      <div className={`rounded-2xl p-5 border ${
        netBalance >= 0
          ? 'bg-blue-50 border-blue-200'
          : 'bg-orange-50 border-orange-200'
      }`}>
        <p className={`text-sm font-medium ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
          Net Balance
        </p>
        <p className={`text-2xl font-bold mt-1 ${netBalance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
          {formatCurrency(netBalance)}
        </p>
      </div>
    </div>
  );
}
