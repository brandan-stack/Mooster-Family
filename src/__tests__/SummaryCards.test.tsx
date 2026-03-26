import { render, screen } from '@testing-library/react';
import SummaryCards from '@/components/SummaryCards';

describe('SummaryCards', () => {
  it('renders income, expenses, and balance labels', () => {
    render(<SummaryCards totalIncome={5000} totalExpenses={2000} netBalance={3000} />);
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net Balance')).toBeInTheDocument();
  });

  it('displays income amount', () => {
    render(<SummaryCards totalIncome={5000} totalExpenses={2000} netBalance={3000} />);
    // Use a function matcher to handle locale-specific non-breaking spaces
    expect(screen.getByText((t) => t.replace(/\s/g, ' ').includes('5 000'))).toBeInTheDocument();
    expect(screen.getByText((t) => t.replace(/\s/g, ' ').includes('2 000'))).toBeInTheDocument();
    expect(screen.getByText((t) => t.replace(/\s/g, ' ').includes('3 000'))).toBeInTheDocument();
  });

  it('shows negative balance with orange styling', () => {
    const { container } = render(
      <SummaryCards totalIncome={1000} totalExpenses={3000} netBalance={-2000} />
    );
    expect(screen.getByText((t) => t.replace(/\s/g, ' ').includes('-') && t.replace(/\s/g, ' ').includes('2 000'))).toBeInTheDocument();
    expect(container.querySelector('.bg-orange-50')).toBeInTheDocument();
  });
});
