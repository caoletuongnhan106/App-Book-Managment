import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoanAction from '../components/LoanAction';
import LoanTable from '../components/LoanTable';
import { useLoanManagement } from '../hooks/useLoanManagement';

const UserLoans: React.FC = () => {
  const navigate = useNavigate();
  const {
    loans,
    availableBooks,
    loading,
    error,
    handleBorrow,
    handleReturn
  } = useLoanManagement();

  return (
    <Box sx={{ p: 3 }}>
      <Button onClick={() => navigate('/')} sx={{ mb: 2 }}>Back</Button>
      <Typography variant="h5" gutterBottom>Quản lý mượn/trả sách</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <LoanAction
        availableBooks={availableBooks}
        onBorrow={handleBorrow}
        loading={loading}
      />
      <LoanTable loans={loans} onReturn={handleReturn} loading={loading} />
    </Box>
  );
};

export default UserLoans;
