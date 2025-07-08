import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useDataGrid } from '../hooks/useDataGrid';

interface GenericDataGridProps<T> {
  title: string;
  rows: T[];
  columns: GridColDef[];
  usePaper?: boolean;
}

const GenericDataGrid = <T,>(props: GenericDataGridProps<T>) => {
  const { title, rows, columns, usePaper = false } = props;
  const { paginationModel, handlePaginationModelChange, columns: memoizedColumns, rows: memoizedRows } =
    useDataGrid({ initialRows: rows, initialColumns: columns });

  const Content: React.ElementType = usePaper ? Paper : Box;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Content
        elevation={usePaper ? 2 : 0}
        sx={{
          height: usePaper ? 400 : 'auto',
          width: '100%',
          p: usePaper ? 2 : 0,
          ...(usePaper ? {} : { autoHeight: true }),
        }}
      >
        <DataGrid
          rows={memoizedRows}
          columns={memoizedColumns}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          pageSizeOptions={[5, 10, 20]}
          autoHeight={!usePaper}
        />
      </Content>
    </Box>
  );
};

export default GenericDataGrid;