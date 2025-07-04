import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const StyledOverlay = styled(Box)(({ }) => ({
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

const StyledTextField = styled(TextField)(({ }) => ({
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
          Quản lý mượn/trả sách (Admin)
        </Typography>

        <StyledTextField
          label="Tìm kiếm (Tiêu đề sách hoặc Tên người mượn)"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3, width: '100%', maxWidth: 400 }}
        />
        <LoanTable
          {...table}
          loans={table.data}
          loading={loading || table.loading}
          error={error || table.error}
        />
      </Box>
    </StyledContainer>
  );
};

export default AdminLoans;