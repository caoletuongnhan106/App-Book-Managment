import { useMemo } from 'react';
import { BookProvider } from './context/BookContext';
import { useBookContext } from './context/BookContext';
import AddBookForm from './components/AddBookForm';
import CardComponent from './components/Card';
import { Container, Box, Typography } from '@mui/material';

function AppContent() {
  const { state } = useBookContext();
  const books = state.books; 

  const bookList = useMemo(() => {
    return books ? books.map((book) => <CardComponent key={book.id} book={book} />) : [];
  }, [books]);

  return (
    <Container maxWidth="lg" sx={{ mt: 3, backgroundColor: 'background.default', p: 2 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Library Management System
      </Typography>
      <AddBookForm />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mt: 3,
          gap: 2,
        }}
      >
        {books && books.length === 0 ? (
          <Typography align="center" sx={{ width: '100%', color: 'text.secondary' }}>
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