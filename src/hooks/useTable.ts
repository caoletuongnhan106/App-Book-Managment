import { useState } from 'react';

interface UseTableProps {
  initialData: any[];
  initialRowsPerPage?: number;
}

interface TableState {
  page: number;
  rowsPerPage: number;
  data: any[];
}

export const useTable = ({ initialData, initialRowsPerPage = 5 }: UseTableProps) => {
  const [tableState, setTableState] = useState<TableState>({
    page: 0,
    rowsPerPage: initialRowsPerPage,
    data: initialData,
  });

  const handleChangePage = (newPage: number) => {
    setTableState((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setTableState((prev) => ({ ...prev, page: 0, rowsPerPage: newRowsPerPage }));
  };

  const updateData = (newData: any[]) => {
    setTableState((prev) => ({ ...prev, data: newData, page: 0 }));
  };

  return {
    ...tableState,
    handleChangePage,
    handleChangeRowsPerPage,
    updateData,
  };
};