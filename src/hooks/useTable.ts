import { useState, useEffect, useCallback } from 'react';
import { type Loan } from '../api/loans';

interface UseTableProps {
  initialData?: Loan[];
  initialRowsPerPage?: number;
  fetchApiFn?: () => Promise<Loan[]>;
  isAdmin?: boolean;
  userId?: number;
  filteredData?: Loan[];
}

interface TableState {
  page: number;
  rowsPerPage: number;
  data: Loan[];
  total: number;
}

export const useTable = ({
  initialData = [],
  initialRowsPerPage = 5,
  fetchApiFn,
  isAdmin,
  userId,
  filteredData,
}: UseTableProps) => {
  const [tableState, setTableState] = useState<TableState>({
    page: 0,
    rowsPerPage: initialRowsPerPage,
    data: initialData.slice(0, initialRowsPerPage),
    total: initialData.length,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!fetchApiFn || !userId) return;
    setLoading(true);
    try {
      const loans = await fetchApiFn();
      const filteredLoans = isAdmin ? loans : loans.filter((loan) => loan.userId === userId);
      updateTableData(filteredLoans);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi gọi API');
    } finally {
      setLoading(false);
    }
  }, [fetchApiFn, isAdmin, userId]);

  const updateTableData = (data: Loan[]) => {
    const total = data.length;
    const start = tableState.page * tableState.rowsPerPage;
    const end = start + tableState.rowsPerPage;
    setTableState((prev) => ({
      ...prev,
      data: data.slice(start, end),
      total,
    }));
  };

  useEffect(() => {
    if (fetchApiFn) {
      fetchData();
    } else if (filteredData) {
      updateTableData(filteredData);
    } else if (initialData) {
      updateTableData(initialData);
    }
  }, [fetchApiFn, fetchData, filteredData, initialData, tableState.page, tableState.rowsPerPage]);

  const handleChangePage = (newPage: number) => {
    setTableState((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setTableState((prev) => ({ ...prev, page: 0, rowsPerPage: newRowsPerPage }));
  };

  const updateData = (newData: Loan[]) => {
    updateTableData(newData);
  };

  return {
    ...tableState,
    loading,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    updateData,
    fetchData,
  };
};