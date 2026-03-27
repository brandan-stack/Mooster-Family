import { render, screen, fireEvent } from '@testing-library/react';
import TransactionForm from '@/components/TransactionForm';

describe('TransactionForm', () => {
  it('renders form fields', () => {
    render(<TransactionForm onAdd={jest.fn()} />);
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it('calls onAdd with correct values when form is submitted', () => {
    const onAdd = jest.fn();
    render(<TransactionForm onAdd={onAdd} />);

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test transaction' },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: '500' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        description: 'Test transaction',
        amount: 500,
        type: 'expense',
      })
    );
  });

  it('does not call onAdd when description is empty', () => {
    const onAdd = jest.fn();
    render(<TransactionForm onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '500' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Transaction' }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('does not call onAdd when amount is zero or negative', () => {
    const onAdd = jest.fn();
    render(<TransactionForm onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '-100' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Transaction' }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('switches to income type when Income button is clicked', () => {
    render(<TransactionForm onAdd={jest.fn()} />);
    fireEvent.click(screen.getByText('Income'));
    expect(screen.getByText('Salary')).toBeInTheDocument();
  });
});
