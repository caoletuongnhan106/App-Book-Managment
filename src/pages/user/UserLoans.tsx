import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLoanManagement } from '../../hooks/useLoanManagement';
import { useEffect } from 'react';
import LoanTable from '../../components/LoanTable';
import { useTable } from '../../hooks/useTable';
import { useSearchFilter } from '../../hooks/useSearchFilter';
import { getLoansByUser, returnBook } from '../../api/loans';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

const StyledContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  position: 'relative',
  overflow: 'hidden',
}));

const StyledOverlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(236, 239, 241, 0.3)',
  zIndex: 0,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: Number(theme.shape.borderRadius) * 2,
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const UserLoans: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id ? Number(user.id) : 0;
  const { loans, fetchLoans, loading } = useLoanManagement();
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

  const handleReturn = async (loanId: number) => {
    try {
      await returnBook(loanId);
      await fetchLoans(); // ✅ Refresh lại sau khi trả
    } catch (error) {
      console.error('Lỗi trả sách:', error);
    }
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'bookTitle', label: 'Tên sách' },
    { id: 'loanDate', label: 'Ngày mượn' },
    {
      id: 'returnDate',
      label: 'Ngày trả',
      render: (value: any) =>
        value ? (
          dayjs(value).format('DD/MM/YYYY')
        ) : (
          <Typography color="text.secondary">Chưa trả</Typography>
        ),
    },
    {
      id: 'status',
      label: 'Trạng thái',
      render: (_: any, row: any) => {
        const today = dayjs();
        const expectedReturn = dayjs(row.expectedReturnDate);
        const returned = !!row.returnDate;

        if (returned) {
          return <Typography color="text.secondary">Đã trả</Typography>;
        }

        if (today.isAfter(expectedReturn)) {
          return <Typography color="error.main" fontWeight="bold">Quá hạn</Typography>;
        }

        return <Typography color="warning.main" fontWeight="bold">Đang mượn</Typography>;
      },
    },
    // {
    //   id: 'action',
    //   label: 'Hành động',
    //   render: (_: any, row: any) =>
    //     !row.returnDate && (
    //       <Button
    //         size="small"
    //         variant="outlined"
    //         color="primary"
    //         onClick={() => handleReturn(row.id)}
    //       >
    //         Trả sách
    //       </Button>
    //     ),
    // },
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
          sx={{
            mb: 2,
            borderRadius: '20px',
            color: '#1976d2',
            borderColor: '#1976d2',
            '&:hover': { borderColor: '#1565c0' },
          }}
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
          fullWidth
          sx={{ maxWidth: 500, mx: 'auto' }}
        />

        <LoanTable
          {...tableProps}
          loans={table.data}
          columns={columns}
          loading={loading || table.loading}
          total={table.total}
        />
      </Box>
    </StyledContainer>
  );
};

export default UserLoans;
