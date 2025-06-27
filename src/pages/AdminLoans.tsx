import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoanManagement } from '../hooks/useLoanManagement';
import { useEffect } from 'react';
import CustomTable from '../components/CustomTable';
import { useTable } from '../hooks/useTable';

const AdminLoans: React.FC = () => {
  const { loans, loading, error, fetchLoans } = useLoanManagement({ isAdmin: true });
  const navigate = useNavigate();
  const table = useTable({ initialData: loans });

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  useEffect(() => {
    table.updateData(loans);
  }, [loans]);

  const handleBack = () => navigate('/');

  const columns = [
    { id: 'id', label: 'ID Mượn' },
    { id: 'userName', label: 'Tên Người Mượn' },
    { id: 'bookTitle', label: 'Tiêu đề Sách' },
    { id: 'loanDate', label: 'Ngày Mượn' },
    { id: 'returnDate', label: 'Ngày Trả' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>BACK</Button>
      <Typography variant="h5" gutterBottom>Quản lý mượn/trả sách (Admin)</Typography>
      <CustomTable
        loading={loading}
        columns={columns}
        data={table.data.map((row) => ({
          ...row,
          loanDate: new Date(row.loanDate).toLocaleDateString('vi-VN'),
          returnDate: row.returnDate ? new Date(row.returnDate).toLocaleDateString('vi-VN') : 'Chưa trả',
        }))}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.handleChangePage}
        onRowsPerPageChange={table.handleChangeRowsPerPage}
      />
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
};

export default AdminLoans;