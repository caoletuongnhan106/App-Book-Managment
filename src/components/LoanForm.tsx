import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface LoanFormProps {
  availableBooks: number[];
  selectedBookId: number | null;
  onSelectChange: (bookId: number) => void;
  onBorrow: () => void;
  loading: boolean;
}

const LoanForm: React.FC<LoanFormProps> = ({
  availableBooks,
  selectedBookId,
  onSelectChange,
  onBorrow,
  loading,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Chọn sách để mượn</InputLabel>
        <Select
          value={selectedBookId || ''}
          onChange={(e) => onSelectChange(e.target.value as number)}
          disabled={loading}
        >
          {availableBooks.map((bookId) => (
            <MenuItem key={bookId} value={bookId}>
              Sách {bookId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={onBorrow}
        disabled={!selectedBookId || loading}
        sx={{ mt: 1 }}
      >
        Mượn sách
      </Button>
    </Box>
  );
};

export default LoanForm;