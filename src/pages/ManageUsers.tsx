import React from 'react';
import GenericDataGrid from '../components/GenericDataGrid';
import {type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 130 },
];

const rows = [
  { id: 1, email: 'admin@gmail.com', role: 'admin' },
  { id: 2, email: 'user1@gmail.com', role: 'user' },
];

const ManageUsers: React.FC = () => {
  return <GenericDataGrid title="Manage Users" rows={rows} columns={columns} />;
};

export default ManageUsers;