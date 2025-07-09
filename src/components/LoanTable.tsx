import React from 'react';
import CustomTable from './CustomTable';
import type { Loan } from '../api/loans';
import { Typography, Button } from '@mui/material';

interface Column {
  id: string;
  label: string;
  render?: (value: any, row?: Loan) => React.ReactNode;
}

interface LoanTableProps {
  loans: Loan[];
  columns?: Column[];
  onReturn?: (loanId: number) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const LoanTable: React.FC<LoanTableProps> = ({
  loans,
  onReturn,
  loading,
  error,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'bookTitle', label: 'Sách' },
    { id: 'loanDate', label: 'Ngày mượn' },
    { id: 'returnDate', label: 'Ngày trả',  render: (value: string | undefined) => value || 'Chưa trả'},
    {
      id: 'action',
      label: 'Hành động',
      render: (_: any, row: Loan) =>
        row.returnDate ? null : (
          <Button
            size="small"
            variant="outlined"
            disabled={Boolean(row.returnDate) || loading}
            onClick={() => onReturn?.(row.id)}
          >
            Trả sách
          </Button>
        ),
    },
  ];

  return (
    <>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <CustomTable
          columns={columns}
          data={loans}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          loading={loading}
        />
      )}
    </>
  );
};

export default LoanTable;