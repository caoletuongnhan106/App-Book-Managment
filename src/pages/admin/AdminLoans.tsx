import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stack,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLoanManagement } from '../../hooks/useLoanManagement';
import { useTable } from '../../hooks/useTable';
import { getLoansByUser } from '../../api/loans';
import type { Loan } from '../../api/loans';
import LoanTable from '../../components/LoanTable';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  },
}));

const StyledTextField = styled(TextField)(({ }) => ({
  minWidth: 180,
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
  },
}));

const AdminLoans: React.FC = () => {
  const { loans, loading, error, fetchLoans } = useLoanManagement({ isAdmin: true });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('');

  const fetchApiFn = () => getLoansByUser(0, true);
  const table = useTable({ initialData: loans, fetchApiFn, isAdmin: true });

  const filteredData = useMemo(() => {
    return loans.filter((loan: Loan) => {
      const matchesSearch =
        loan.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.userName.toLowerCase().includes(searchTerm.toLowerCase());

      const loanDate = new Date(loan.loanDate);
      const matchesFromDate = fromDate ? loanDate >= new Date(fromDate) : true;
      const matchesToDate = toDate ? loanDate <= new Date(toDate) : true;

      const matchesStatus =
        status === '' ? true :
        status === 'returned' ? loan.returned :
        status === 'notReturned' ? !loan.returned : true;

      return matchesSearch && matchesFromDate && matchesToDate && matchesStatus;
    });
  }, [loans, searchTerm, fromDate, toDate, status]);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  useEffect(() => {
    table.updateData(filteredData);
  }, [filteredData]);

  const handleBack = () => navigate('/');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchParams(value ? { search: value } : {});
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFromDate('');
    setToDate('');
    setStatus('');
    setSearchParams({});
  };

  const handleReload = async () => {
    await fetchLoans();
    await table.fetchData();
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', p: { xs: 2, sm: 4 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{
            mb: 2,
            borderRadius: 3,
            fontWeight: 600,
            color: 'primary.main',
            borderColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
              borderColor: 'primary.dark',
            },
          }}
        >
          ← Quay lại
        </Button>

        <Typography variant="h4" fontWeight={700} color="primary" align="center" gutterBottom>
          Quản lý mượn / trả sách
        </Typography>

        <StyledPaper>
          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={2}
            useFlexGap
            mb={2}
            justifyContent="flex-start"
          >
            <StyledTextField
              label="Tìm kiếm (Tên/Sách)"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <StyledTextField
              type="date"
              label="Từ ngày"
              InputLabelProps={{ shrink: true }}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <StyledTextField
              type="date"
              label="Đến ngày"
              InputLabelProps={{ shrink: true }}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <StyledTextField
              select
              label="Trạng thái"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="returned">Đã trả</MenuItem>
              <MenuItem value="notReturned">Chưa trả</MenuItem>
            </StyledTextField>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={handleClearFilter}>
              Xóa bộ lọc
            </Button>
            <Button variant="contained" onClick={handleReload}>
              Tải lại dữ liệu
            </Button>
          </Stack>
        </StyledPaper>

        <LoanTable
          {...table}
          loans={table.data}
          loading={loading || table.loading}
          error={error || table.error}
        />
      </Box>
    </Box>
  );
};

export default AdminLoans;
