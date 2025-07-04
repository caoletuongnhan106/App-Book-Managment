import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoanManagement } from '../hooks/useLoanManagement';
import { useEffect } from 'react';
import LoanTable from '../components/LoanTable';
import { useTable } from '../hooks/useTable';
import { useSearchFilter } from '../hooks/useSearchFilter';
import { getLoansByUser } from '../api/loans';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  position: 'relative',
  overflow: 'hidden',
}));

const StyledOverlay = styled(Box)(({  }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(236, 239, 241, 0.3)',
  zIndex: 0,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: '#1976d2',
  color: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#1565c0',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)',
  },
}));

const StyledTextField = styled(TextField)(({  }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    '& fieldset': {
      borderColor: '#1976d2',
    },
    '&:hover fieldset': {
      borderColor: '#1565c0',
    },
  },
}));

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
          <StyledButton
            variant="contained"
            size="small"
            onClick={() => handleReturn(row.id)}
            disabled={loading}
          >
            Trả sách
          </StyledButton>
        ),
    },
  ];

  const tableProps = {
    ...table,
    loading: loading || table.loading,
    onReturn: handleReturn,
  };

  return (
    <StyledContainer>
      <StyledOverlay />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <StyledButton
          variant="outlined"
          onClick={handleBack}
          sx={{ mb: 2, borderRadius: '20px', color: '#1976d2', borderColor: '#1976d2', '&:hover': { borderColor: '#1565c0' } }}
        >
          BACK
        </StyledButton>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center', mb: 3 }}
        >
          Quản lý mượn/trả sách
        </Typography>

        <StyledTextField
          label="Tìm kiếm (Tiêu đề sách)"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3, width: '100%', maxWidth: 400 }}
        />
        <LoanTable
          {...tableProps}
          loans={table.data}
          columns={columns}
          loading={loading || table.loading}
        />
      </Box>
    </StyledContainer>
  );
};

export default UserLoans;