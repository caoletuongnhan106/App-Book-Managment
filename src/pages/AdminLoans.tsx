import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useLoanManagement } from '../hooks/useLoanManagement';
import LoanItem from '../components/LoanItem';

const AdminLoans: React.FC = () => {
  const { loans, handleReturn, error } = useLoanManagement();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Quản lý danh sách mượn sách
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Paper sx={{ mt: 2, overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề sách</TableCell>
              <TableCell>Ngày mượn</TableCell>
              <TableCell>Ngày trả</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.bookTitle}</TableCell>
                <TableCell>{loan.loanDate}</TableCell>
                <TableCell>{loan.returnDate || 'Chưa trả'}</TableCell>
                <TableCell>
                  <LoanItem
                    loan={loan}
                    onReturn={handleReturn}
                    isReturnable={true} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminLoans;