import { renderHook, act } from '@testing-library/react';
import { useBudget } from '@/hooks/useBudget';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
});

describe('useBudget', () => {
  it('starts with zero balance', () => {
    const { result } = renderHook(() => useBudget());
    expect(result.current.totalIncome).toBe(0);
    expect(result.current.totalExpenses).toBe(0);
    expect(result.current.netBalance).toBe(0);
  });

  it('adds income transaction and updates totals', () => {
    const { result } = renderHook(() => useBudget());
    act(() => {
      result.current.addTransaction({
        description: 'Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary',
      });
    });
    expect(result.current.totalIncome).toBe(5000);
    expect(result.current.netBalance).toBe(5000);
    expect(result.current.transactions).toHaveLength(1);
  });

  it('adds expense transaction and updates totals', () => {
    const { result } = renderHook(() => useBudget());
    act(() => {
      result.current.addTransaction({
        description: 'Groceries',
        amount: 1200,
        type: 'expense',
        category: 'Food',
      });
    });
    expect(result.current.totalExpenses).toBe(1200);
    expect(result.current.netBalance).toBe(-1200);
  });

  it('calculates correct net balance with income and expenses', () => {
    const { result } = renderHook(() => useBudget());
    act(() => {
      result.current.addTransaction({ description: 'Salary', amount: 10000, type: 'income', category: 'Salary' });
      result.current.addTransaction({ description: 'Rent', amount: 4000, type: 'expense', category: 'Housing' });
      result.current.addTransaction({ description: 'Food', amount: 1500, type: 'expense', category: 'Food' });
    });
    expect(result.current.totalIncome).toBe(10000);
    expect(result.current.totalExpenses).toBe(5500);
    expect(result.current.netBalance).toBe(4500);
  });

  it('removes a transaction by id', () => {
    const { result } = renderHook(() => useBudget());
    act(() => {
      result.current.addTransaction({ description: 'Salary', amount: 5000, type: 'income', category: 'Salary' });
    });
    const id = result.current.transactions[0].id;
    act(() => {
      result.current.removeTransaction(id);
    });
    expect(result.current.transactions).toHaveLength(0);
    expect(result.current.totalIncome).toBe(0);
  });

  it('clearCache resets all transactions to empty', () => {
    const { result } = renderHook(() => useBudget());
    act(() => {
      result.current.addTransaction({ description: 'Salary', amount: 5000, type: 'income', category: 'Salary' });
      result.current.addTransaction({ description: 'Rent', amount: 2000, type: 'expense', category: 'Housing' });
    });
    expect(result.current.transactions).toHaveLength(2);
    act(() => {
      result.current.clearCache();
    });
    expect(result.current.transactions).toHaveLength(0);
    expect(result.current.totalIncome).toBe(0);
    expect(result.current.totalExpenses).toBe(0);
    expect(result.current.netBalance).toBe(0);
  });

  it('clearCache removes data from localStorage', () => {
    const { result } = renderHook(() => useBudget());
    act(() => {
      result.current.addTransaction({ description: 'Salary', amount: 5000, type: 'income', category: 'Salary' });
    });
    act(() => {
      result.current.clearCache();
    });
    expect(localStorageMock.getItem('mooster-family-budget')).toBeNull();
  });
});
