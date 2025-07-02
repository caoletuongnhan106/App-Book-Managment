import React, { useState } from 'react';
import { Box, Autocomplete, TextField, Button } from '@mui/material';

interface LoanActionProps {
  availableBooks: { id: string; title: string }[];
  onBorrow: (bookId: string, bookTitle: string) => void;
  loading: boolean;
}

const LoanAction: React.FC<LoanActionProps> = ({
  availableBooks,
  onBorrow,
  loading
}) => {
  const [selected, setSelected] = useState<{ id: string; title: string } | null>(null);

  const handle = () => {
    if (selected) {
      onBorrow(selected.id, selected.title);
      setSelected(null);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Autocomplete
        options={availableBooks}
        getOptionLabel={(opt) => opt.title}
        value={selected}
        onChange={(_, v) => setSelected(v)}
        renderInput={(params) => (
          <TextField {...params} label="Tìm và chọn sách để mượn" fullWidth />
        )}
        disabled={loading || availableBooks.length === 0}
        sx={{ mb: 1 }}
      />
      <Button
        variant="contained"
        onClick={handle}
        disabled={!selected || loading}
      >
        {loading ? 'Đang mượn...' : 'Mượn sách'}
      </Button>
    </Box>
  );
};

export default LoanAction;
