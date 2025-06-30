import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoanManagement } from '../hooks/useLoanManagement';
import { useEffect } from 'react';
import LoanTable from '../components/LoanTable';
import { useTable } from '../hooks/useTable';
import { useSearchFilter } from '../hooks/useSearchFilter';
import { getLoansByUser } from '../api/loans';

const AdminLoans: React.FC = () => {
  const { loans, loading, error, fetchLoans } = useLoanManagement({ isAdmin: true });
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, filteredData } = useSearchFilter(loans, ['bookTitle', 'userName']);

  const fetchApiFn = () => getLoansByUser(0, true);
  const table = useTable({ initialData: loans, fetchApiFn, isAdmin: true, filteredData });

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  useEffect(() => {
    table.updateData(filteredData);
  }, [filteredData]);

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
      <TextField
        label="Tìm kiếm (Tiêu đề sách hoặc Tên người mượn)"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: '100%', maxWidth: 400 }}
      />
      <LoanTable
        loans={table.data}
        columns={columns}
        loading={loading || table.loading}
        error={error || table.error}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        total={table.total}
        onPageChange={table.handleChangePage}
        onRowsPerPageChange={table.handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AdminLoans;