import { useState, useMemo, useCallback } from 'react';
import {type GridColDef } from '@mui/x-data-grid';

interface UseDataGridProps<T> {
  initialRows: T[];
  initialColumns: GridColDef[];
}

export const useDataGrid = <T,>(props: UseDataGridProps<T>) => {
  const { initialRows, initialColumns } = props;
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

  const handlePaginationModelChange = useCallback((newModel: { pageSize: number; page: number }) => {
    setPaginationModel(newModel);
  }, []);

  const memoizedColumns = useMemo(() => initialColumns, [initialColumns]);
  const memoizedRows = useMemo(() => initialRows, [initialRows]);

  return {
    paginationModel,
    handlePaginationModelChange,
    columns: memoizedColumns,
    rows: memoizedRows,
  };
};