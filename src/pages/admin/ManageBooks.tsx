import React from 'react';
import GenericDataGrid from '../../components/GenericDataGrid';
import {type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'category', headerName: 'Category', width: 130 },
];

const rows = [
  { id: 1, title: 'React Basics', author: 'John Doe', category: 'Tech' },
  { id: 2, title: 'Learning Python', author: 'Jane Smith', category: 'Programming' },
];

const ManageBooks: React.FC = () => {
  return <GenericDataGrid title="Manage Books" rows={rows} columns={columns} />;
};

export default ManageBooks;