import { Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoanManagement } from '../hooks/useLoanManagement';
import { useEffect } from 'react';

const AdminLoans: React.FC = () => {
  const { loans, loading, error, fetchLoans } = useLoanManagement({ isAdmin: true });
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
        BACK
      </Button>
      <Typography variant="h5" gutterBottom>
        Quản lý mượn/trả sách (Admin)
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Mượn</TableCell>
                <TableCell>Tên Người Mượn</TableCell>
                <TableCell>Tiêu đề Sách</TableCell>
                <TableCell>Ngày Mượn</TableCell>
                <TableCell>Ngày Trả</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.length > 0 ? (
                loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>{loan.id}</TableCell>
                    <TableCell>{loan.userName}</TableCell>
                    <TableCell>{loan.bookTitle}</TableCell>
                    <TableCell>{new Date(loan.loanDate).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell>{loan.returnDate ? new Date(loan.returnDate).toLocaleDateString('vi-VN') : 'Chưa trả'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Không có dữ liệu mượn sách.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default AdminLoans;
