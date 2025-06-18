import { useState, useEffect, useCallback } from 'react';
import { loanApi,type Loan } from '../api/loans';
import { useAuth } from '../context/AuthContext';

export const useLoanManagement = (userId?: number) => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [availableBooks] = useState<number[]>([1, 2, 3]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = useCallback(async () => {
    if (!userId && !user?.id) return;
    setLoading(true);
    try {
        const data = await loanApi.getLoansByUser(Number(userId || user!.id));

      setLoans(data);
      setError(null);
    } catch (err) {
      setError('Lỗi khi tải danh sách mượn sách');
    } finally {
      setLoading(false);
    }
  }, [userId, user?.id]);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const handleBorrow = useCallback(async () => {
    if (!userId && !user?.id || !selectedBookId) return;
    setLoading(true);
    try {
        const loan = await loanApi.borrowBook(Number(userId || user!.id), Number(selectedBookId));

      setLoans((prev) => [...prev, loan]);
      setSelectedBookId(null);
      setError(null);
    } catch (err) {
      setError('Lỗi khi mượn sách');
    } finally {
      setLoading(false);
    }
  }, [userId, user?.id, selectedBookId]);

  const handleReturn = useCallback(async (loanId: number) => {
    setLoading(true);
    try {
      await loanApi.returnBook(loanId);
      setLoans((prev) => prev.filter((loan) => loan.id !== loanId));
      setError(null);
    } catch (err) {
      setError('Lỗi khi trả sách');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loans,
    availableBooks,
    selectedBookId,
    setSelectedBookId: (value: number | null) => setSelectedBookId(value), 
    handleBorrow,
    handleReturn,
    loading,
    error,
    refreshLoans: fetchLoans,
  };
};