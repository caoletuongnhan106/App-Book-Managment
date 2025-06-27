import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import type { Loan } from '../api/loans';

interface LoanTableProps {
  loans: Loan[];
  onReturn: (loanId: number) => Promise<void> | void;
  loading?: boolean;
}

const LoanTable: React.FC<LoanTableProps> = ({ loans, onReturn, loading = false }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Sách</TableCell>
          <TableCell>Ngày mượn</TableCell>
          <TableCell>Ngày trả</TableCell>
          <TableCell>Hành động</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loans.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} align="center">
              {loading ? 'Đang tải...' : 'Chưa có mượn sách nào.'}
            </TableCell>
          </TableRow>
        ) : (
          loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>{loan.id}</TableCell>
              <TableCell>{loan.bookTitle}</TableCell>
              <TableCell>{loan.loanDate}</TableCell>
              <TableCell>{loan.returnDate || 'Chưa trả'}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={!!loan.returnDate || loading}
                  onClick={() => onReturn(loan.id)}
                >
                  Trả sách
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default LoanTable;
