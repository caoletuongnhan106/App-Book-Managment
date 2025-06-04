import type { Book } from '../types';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface CardProps {
  book: Book;
}

const CardComponent: React.FC<CardProps> = ({ book }) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '50%', md: '33.33%' },
        p: 1,
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <Card sx={{ minHeight: '150px', backgroundColor: 'background.default' }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            {book.title}
          </Typography>
          <Typography color="text.secondary">Author: {book.author}</Typography>
          <Typography color="text.secondary">Year: {book.year}</Typography>
          <Typography color="text.secondary">Quantity: {book.quantity}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardComponent;