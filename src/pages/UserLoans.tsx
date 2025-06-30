import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoanManagement } from '../hooks/useLoanManagement';
import { useEffect } from 'react';
import LoanTable from '../components/LoanTable';
import { useTable } from '../hooks/useTable';
import { useSearchFilter } from '../hooks/useSearchFilter';
import { getLoansByUser } from '../api/loans';

const UserLoans: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id ? Number(user.id) : 0;
  const { loans, handleReturn, loading, fetchLoans } = useLoanManagement();
  const userLoans = loans.filter((loan) => loan.userId === userId);
  const { searchTerm, setSearchTerm, filteredData } = useSearchFilter(userLoans, ['bookTitle']);

  const fetchApiFn = () => getLoansByUser(userId);
  const table = useTable({ initialData: userLoans, fetchApiFn, filteredData });

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  useEffect(() => {
    table.updateData(filteredData);
  }, [filteredData]);

  const handleBack = () => navigate(-1);

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'bookTitle', label: 'Tên sách' },
    { id: 'loanDate', label: 'Ngày mượn' },
    { id: 'returnDate', label: 'Ngày trả' },
    {
      id: 'status',
      label: 'Trạng thái',
      render: (_: any, row: any) =>
        row.returnDate ? (
          <span style={{ color: 'gray' }}>Đã trả</span>
        ) : (
          <span style={{ color: 'green', fontWeight: 'bold' }}>Đang mượn</span>
        ),
    },
    {
      id: 'action',
      label: 'Hành động',
      render: (_: any, row: any) =>
        row.returnDate ? (
          <Typography variant="body2" color="textSecondary">Đã trả</Typography>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleReturn(row.id)}
            disabled={loading}
          >
            Trả sách
          </Button>
        ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>BACK</Button>
      <Typography variant="h6" gutterBottom>Quản lý mượn/trả sách</Typography>
      <TextField
        label="Tìm kiếm (Tiêu đề sách)"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: '100%', maxWidth: 400 }}
      />
      <LoanTable
        loans={table.data}
        columns={columns}
        onReturn={handleReturn}
        loading={loading || table.loading}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        total={table.total}
        onPageChange={table.handleChangePage}
        onRowsPerPageChange={table.handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserLoans;