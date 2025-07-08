import React from 'react';
import GenericDataGrid from '../components/GenericDataGrid';
import {type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'metric', headerName: 'Metric', width: 150 },
  { field: 'value', headerName: 'Value', width: 150 },
];

const rows = [
  { id: 1, metric: 'Total Orders', value: 124 },
  { id: 2, metric: 'Total Users', value: 50 },
  { id: 3, metric: 'Books in Library', value: 300 },
];

const Dashboard: React.FC = () => {
  return <GenericDataGrid title="Admin Dashboard" rows={rows} columns={columns} />;
};

export default Dashboard;