import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoanManagement } from '../hooks/useLoanManagement';
import CustomTable from '../components/CustomTable';
import { useTable } from '../hooks/useTable';

const UserLoans: React.FC = () => {
  const navigate = useNavigate();
  const { loans, handleReturn, loading, error } = useLoanManagement();
  const table = useTable({ initialData: loans });

  useEffect(() => {
    table.updateData(loans);
  }, [loans]);

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'bookTitle', label: 'Tên sách' },
    { id: 'loanDate', label: 'Ngày mượn' },
    { id: 'returnDate', label: 'Ngày trả' },
    {
      id: 'actions',
      label: 'Hành động',
      render: (row: any) => (
        <Button
          size="small"
          variant="outlined"
          disabled={Boolean(row.returnDate) || loading}
          onClick={() => handleReturn(row.id)}
        >
          Trả sách
        </Button>
      ),
    },
  ];

  const formattedData = table.data
    .filter((row) => row && typeof row === 'object') 
    .map((row) => {
      const loanDate = row.loanDate
        ? new Date(row.loanDate).toLocaleDateString('vi-VN')
        : 'Không rõ';

      const returnDate = row.returnDate
        ? new Date(row.returnDate).toLocaleDateString('vi-VN')
        : 'Chưa trả';

      return { ...row, loanDate, returnDate };
    });

  return (
    <Box sx={{ p: 3 }}>
      <Button onClick={() => navigate('/')} sx={{ mb: 2 }}>Back</Button>
      <Typography variant="h5" gutterBottom>Quản lý mượn/trả sách</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <CustomTable
        columns={columns}
        data={formattedData}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.handleChangePage}
        onRowsPerPageChange={table.handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserLoans;
