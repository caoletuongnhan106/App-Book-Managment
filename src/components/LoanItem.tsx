import { Box, Typography, Button } from '@mui/material';

interface LoanItemProps {
  loan: {
    id: number;
    bookTitle: string;
    loanDate: string;
    returnDate?: string;
  };
  onReturn: (loanId: number) => void;
  isReturnable: boolean;
}

const LoanItem: React.FC<LoanItemProps> = ({ loan, onReturn, isReturnable }) => {
  return (
    <Box sx={{ mb: 1, p: 1, border: '1px solid #ddd', borderRadius: 1 }}>
      <Typography>{loan.bookTitle} - Mượn ngày: {loan.loanDate}</Typography>
      <Typography>Trả ngày: {loan.returnDate || 'Chưa trả'}</Typography>
      <Button
        variant="outlined"
        onClick={() => onReturn(loan.id)}
        disabled={!isReturnable || !!loan.returnDate}
        sx={{ mt: 1 }}
      >
        Trả sách
      </Button>
    </Box>
  );
};

export default LoanItem;