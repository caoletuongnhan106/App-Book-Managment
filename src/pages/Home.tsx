import React, { useMemo } from 'react';
import { Container, Box, Typography, Button, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookContext } from '../context/BookContext';
import AddBookForm from '../components/AddBookForm';
import CardComponent from '../components/Card';
import { useSearchFilter } from '../hooks/useSearchFilter'; 

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { state } = useBookContext();
  const navigate = useNavigate();
  const books = state.books || [];

  const { searchTerm, setSearchTerm, filteredData } = useSearchFilter(books, [
    'title',
    'author',
    'category',
  ]);

  const bookList = useMemo(() => {
    return filteredData.map((book) => <CardComponent key={book.id} book={book} />);
  }, [filteredData]);

  const handleLogout = () => logout();

  const goToLoanPage = () => {
    if (user?.role === 'admin') navigate('/admin/loans');
    else if (user?.role === 'user') navigate('/user/loans');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, backgroundColor: 'background.default', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">Xin chào, {user?.email}</Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={goToLoanPage} sx={{ mr: 2 }}>
            {user?.role === 'admin' ? 'Quản lý mượn sách' : 'Mượn / Trả sách'}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Stack>

      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Library Management System
      </Typography>

      {user?.role === 'admin' && <AddBookForm />}

      <TextField
        label="Tìm kiếm sách (Tiêu đề, Tác giả, Thể loại)"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ my: 3 }}
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {filteredData.length === 0 ? (
          <Typography align="center" sx={{ width: '100%', color: 'text.secondary' }}>
            Không tìm thấy sách phù hợp.
          </Typography>
        ) : (
          bookList
        )}
      </Box>
    </Container>
  );
};

export default Home;
