import { useMemo } from 'react';
import { BookProvider } from './context/BookContext';
import { useBookContext } from './context/BookContext';
import AddBookForm from './components/AddBookForm';
import { Container, Box, Card, CardContent, Typography } from '@mui/material';

function AppContent() {
  const { books } = useBookContext();

  const bookList = useMemo(() => {
    return books.map((book) => (
      <Box
        key={book.id}
        sx={{
          width: { xs: '100%', sm: '50%', md: '33.33%' },
          p: 1,
        }}
      >
        <Card sx={{ minHeight: '150px' }}>
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography color="text.secondary">Author: {book.author}</Typography>
            <Typography color="text.secondary">Year: {book.year}</Typography>
            <Typography color="text.secondary">Quantity: {book.quantity}</Typography>
          </CardContent>
        </Card>
      </Box>
    ));
  }, [books]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Library Management System
      </Typography>
      <AddBookForm />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mt: 3,
        }}
      >
        {books.length === 0 ? (
          <Typography align="center" sx={{ width: '100%' }}>
            No books available.
          </Typography>
        ) : (
          bookList
        )}
      </Box>
    </Container>
  );
}

function App() {
  return (
    <BookProvider>
      <AppContent />
    </BookProvider>
  );
}

export default App;