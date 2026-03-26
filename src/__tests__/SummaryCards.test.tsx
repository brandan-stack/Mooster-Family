import { render, screen } from '@testing-library/react';
import SummaryCards from '@/components/SummaryCards';

describe('SummaryCards', () => {
  it('renders income, expenses, and balance', () => {
    render(<SummaryCards totalIncome={5000} totalExpenses={2000} netBalance={3000} />);
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net Balance')).toBeInTheDocument();
  });

  it('displays formatted currency amounts', () => {
    render(<SummaryCards totalIncome={5000} totalExpenses={2000} netBalance={3000} />);
    // ZAR formatted amounts
    expect(screen.getByText(/5\s*000/)).toBeInTheDocument();
    expect(screen.getByText(/2\s*000/)).toBeInTheDocument();
    expect(screen.getByText(/3\s*000/)).toBeInTheDocument();
  });
});
