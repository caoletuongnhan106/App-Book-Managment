import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBookContext } from '../context/BookContext';
import {
  getLoansByUser,
  borrowBook,
  returnBook,
  type Loan
} from '../api/loans';

interface UseLoanManagementProps {
  isAdmin?: boolean;
  userIdOverride?: number;
}

export const useLoanManagement = ({
  isAdmin = false,
  userIdOverride,
}: UseLoanManagementProps = {}) => {
  const { user } = useAuth();
  const { state: { books } } = useBookContext();
  const loggedInUserId = user?.id ? Number(user.id) : null;
  const userId = isAdmin ? userIdOverride ?? null : loggedInUserId;
  const userName = user?.email || `User ${userId}`; 

  const [loans, setLoans] = useState<Loan[]>([]);
  const [availableBooks, setAvailableBooks] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = useCallback(async () => {
    if (userId == null && !isAdmin) return;
    setLoading(true);
    try {
      const data = await getLoansByUser(isAdmin ? 0 : userId!, isAdmin);
      setLoans(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setLoans([]);
    } finally {
      setLoading(false);
    }
  }, [userId, isAdmin]);

  const fetchLoansByUser = useCallback(
    async (targetUserId: number) => {
      if (!isAdmin) return;
      setLoading(true);
      try {
        const data = await getLoansByUser(targetUserId, isAdmin);
        setLoans(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setLoans([]);
      } finally {
        setLoading(false);
      }
    },
    [isAdmin]
  );

  const refreshAvailable = useCallback(() => {
    const borrowedIds = loans.map((l) => l.bookId);
    const avail = books
      .filter((b) => b.isAvailable && !borrowedIds.includes(b.id))
      .map((b) => ({ id: b.id, title: b.title }));
    setAvailableBooks(avail);
  }, [books, loans]);

  const handleBorrow = useCallback(
    async (bookId: string, bookTitle: string, returnDate?: string) => {
      if (userId == null) return;
      setLoading(true);
      try {
        await borrowBook(userId, bookId, bookTitle, userName, returnDate);
        await fetchLoans(); 
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [userId, userName, fetchLoans]
  );

  const handleReturn = useCallback(
    async (loanId: number) => {
      setLoading(true);
      try {
        await returnBook(loanId);
        await fetchLoans(); 
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [fetchLoans]
  );

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  useEffect(() => {
    refreshAvailable();
  }, [refreshAvailable]);

  return {
    loans,
    availableBooks,
    loading,
    error,
    handleBorrow,
    handleReturn,
    fetchLoans,
    fetchLoansByUser,
  };
};
