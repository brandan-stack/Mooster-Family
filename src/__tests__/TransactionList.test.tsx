import { render, screen, fireEvent } from '@testing-library/react';
import TransactionList from '@/components/TransactionList';
import { Transaction } from '@/types/budget';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salary',
    amount: 5000,
    type: 'income',
    category: 'Salary',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    description: 'Groceries',
    amount: 1200,
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString(),
  },
];

describe('TransactionList', () => {
  it('shows empty state when no transactions', () => {
    render(<TransactionList transactions={[]} onRemove={jest.fn()} />);
    expect(screen.getByText(/No transactions yet/i)).toBeInTheDocument();
  });

  it('renders all transactions', () => {
    render(<TransactionList transactions={mockTransactions} onRemove={jest.fn()} />);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  it('calls onRemove with correct id when delete button clicked', () => {
    const onRemove = jest.fn();
    render(<TransactionList transactions={mockTransactions} onRemove={onRemove} />);
    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    fireEvent.click(removeButtons[0]);
    expect(onRemove).toHaveBeenCalledWith('1');
  });
});
