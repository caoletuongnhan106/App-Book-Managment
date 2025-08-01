import React from 'react';
import CustomTable from './CustomTable';
import type { Loan } from '../api/loans';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

interface Column {
  id: string;
  label: string;
  render?: (value: any, row?: Loan) => React.ReactNode;
}

interface LoanTableProps {
  loans: Loan[];
  columns?: Column[];
  loading?: boolean;
  error?: string | null;
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  isAdmin?: boolean;
  onReturn?: (id: number) => void;
}

const LoanTable: React.FC<LoanTableProps> = ({
  loans,
  loading,
  error,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  total,
  columns,
  isAdmin,
}) => {
  const defaultColumns: Column[] = [
    { id: 'id', label: 'ID' },
    { id: 'bookTitle', label: 'Sách' },
    { id: 'loanDate', label: 'Ngày mượn' },
    {
      id: 'returnDate',
      label: 'Ngày trả',
      render: (value: any) =>
        value ? value : <Typography color="text.secondary">Chưa trả</Typography>,
    },
    {
      id: 'status',
      label: 'Trạng thái',
      render: (_: any, row?: Loan) => {
        if (!row) return null;
    
        const today = dayjs();
        const expectedReturn = dayjs(row.expectedReturnDate);
        const returnDate = row.returnDate ? dayjs(row.returnDate) : null;
    
        if (returnDate) {
          return <Typography color="success.main" fontWeight="bold">Đã trả</Typography>;
        }
    
        if (isAdmin) {
          if (today.isAfter(expectedReturn)) {
            return <Typography color="error.main" fontWeight="bold">Quá hạn</Typography>;
          }
          return <Typography color="warning.main" fontWeight="bold">Đang mượn</Typography>;
        } else {
          return <Typography color="warning.main" fontWeight="bold">Đang mượn</Typography>;
        }
      },
    }
    
  ];

  return (
    <>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <CustomTable
          columns={columns ?? defaultColumns}
          data={loans}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          loading={loading}
          totalCount={total}
        />
      )}
    </>
  );
};

export default LoanTable;
