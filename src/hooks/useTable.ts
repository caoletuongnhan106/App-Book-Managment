import { useState, useEffect, useCallback } from 'react';

interface UseTableProps {
  initialData?: any[]; 
  initialRowsPerPage?: number;
  fetchApiFn?: () => Promise<any[]>; 
}

interface TableState {
  page: number;
  rowsPerPage: number;
  data: any[];
}

export const useTable = ({
  initialData = [],
  initialRowsPerPage = 5,
  fetchApiFn,
}: UseTableProps) => {
  const [tableState, setTableState] = useState<TableState>({
    page: 0,
    rowsPerPage: initialRowsPerPage,
    data: initialData,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangePage = (newPage: number) => {
    setTableState((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setTableState((prev) => ({ ...prev, page: 0, rowsPerPage: newRowsPerPage }));
  };

  const updateData = (newData: any[]) => {
    setTableState((prev) => ({ ...prev, data: newData, page: 0 }));
  };

  const fetchData = useCallback(async () => {
    if (!fetchApiFn) return;
    setLoading(true);
    try {
      const result = await fetchApiFn();
      setTableState((prev) => ({ ...prev, data: result, page: 0 }));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi gọi API');
    } finally {
      setLoading(false);
    }
  }, [fetchApiFn]);

  useEffect(() => {
    if (fetchApiFn) {
      fetchData();
    }
  }, [fetchData, fetchApiFn]);

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
