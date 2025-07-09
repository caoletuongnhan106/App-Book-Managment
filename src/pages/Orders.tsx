import React from 'react';
import GenericDataGrid from '../components/GenericDataGrid';
import {type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'user', headerName: 'User', width: 150 },
  { field: 'book', headerName: 'Book Title', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'date', headerName: 'Date Ordered', width: 180 },
];

const rows = [
  { id: 1, user: 'John Doe', book: 'Clean Code', status: 'Returned', date: '2025-07-01' },
  { id: 2, user: 'Jane Smith', book: 'Atomic Habits', status: 'Borrowed', date: '2025-07-03' },
  { id: 3, user: 'Mike Johnson', book: 'The Pragmatic Programmer', status: 'Overdue', date: '2025-06-28' },
];

const Orders: React.FC = () => {
  return <GenericDataGrid title="Orders" rows={rows} columns={columns} usePaper={true} />;
};

export default Orders;