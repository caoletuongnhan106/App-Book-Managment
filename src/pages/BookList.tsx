import { Box, Typography } from '@mui/material';
import CardComponent from '../components/Card';
import { useAvailableBooks } from '../hooks/useAvailableBooks'; 

const BookList: React.FC = () => {
  const books = useAvailableBooks();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Danh sách sách sẵn có
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {books.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Không có sách sẵn để mượn.
          </Typography>
        ) : (
          books.map((book) => <CardComponent key={book.id} book={book} />)
        )}
      </Box>
    </Box>
  );
};

export default BookList;
