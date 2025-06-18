import { Box, Typography } from '@mui/material';
import { useLoanManagement } from '../hooks/useLoanManagement';
import LoanForm from '../components/LoanForm';
import LoanItem from '../components/LoanItem';

const UserLoans: React.FC = () => {
  const {
    loans,
    availableBooks,
    selectedBookId,
    setSelectedBookId,
    handleBorrow,
    handleReturn,
    loading,
    error,
  } = useLoanManagement();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Quản lý mượn/trả sách
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <LoanForm
        availableBooks={availableBooks}
        selectedBookId={selectedBookId}
        onSelectChange={setSelectedBookId}
        onBorrow={handleBorrow}
        loading={loading}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Danh sách mượn sách
      </Typography>
      {loans.map((loan) => (
        <LoanItem
          key={loan.id}
          loan={loan}
          onReturn={handleReturn}
          isReturnable={!loan.returnDate} 
        />
      ))}
    </Box>
  );
};

export default UserLoans;