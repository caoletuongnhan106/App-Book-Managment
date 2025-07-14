import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Stack,
  Modal,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookContext } from '../context/BookContext';
import AddBookForm from '../components/AddBookForm';
import { styled } from '@mui/material/styles';
import CardComponent from '../components/Card';
import type { Book } from '../types';

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f4f6f8',
  minHeight: '100vh',
  padding: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const StyledHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#ffffffcc',
  borderRadius: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: Number(theme.shape.borderRadius) * 2,
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
    backgroundColor: '#fff',
  },
}));

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { state } = useBookContext();
  const navigate = useNavigate();
  const books = state.books || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseAdd = () => setOpenModal(false);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return books;
    const lowerSearch = searchTerm.toLowerCase();
    return books.filter((book: Book) =>
      ['title', 'author', 'category'].some((field) =>
        (book as any)[field]?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [searchTerm, books]);

  const handleLoanPage = () => {
    if (user?.role === 'admin') navigate('/admin/loans');
    else if (user?.role === 'user') navigate('/user/loans');
  };

  const handleProfile = () => navigate('/profile');
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <StyledContainer>
      <StyledHeader elevation={3}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Xin chào, {user?.email}
        </Typography>
        <Stack direction="row" spacing={2}>
          {user?.role === 'admin' && (
            <StyledButton onClick={() => navigate('/admin')}>Dashboard</StyledButton>
          )}
          <StyledButton onClick={handleLoanPage}>
            {user?.role === 'admin' ? 'Quản lý mượn sách' : 'Mượn / Trả sách'}
          </StyledButton>
          <StyledButton onClick={handleProfile}>Trang cá nhân</StyledButton>
          <StyledButton onClick={handleLogout}>Logout</StyledButton>
        </Stack>
      </StyledHeader>

      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: 700, color: '#01579b', mb: 5 }}
      >
        Library Management System
      </Typography>

      {user?.role === 'admin' && (
        <>
          <Box sx={{ textAlign: 'right', mb: 3 }}>
            <StyledButton onClick={handleOpenModal}>+ Add Book</StyledButton>
          </Box>
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: 600 },
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <AddBookForm onClose={handleCloseAdd} />
            </Box>
          </Modal>
        </>
      )}

      <StyledTextField
        label="Tìm kiếm sách (Tiêu đề, Tác giả, Thể loại)"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={3}>
        {filteredData.length === 0 ? (
          <Grid size ={{ xs:12}}>
            <Typography align="center" sx={{ color: '#78909c', fontStyle: 'italic' }}>
              Không tìm thấy sách phù hợp.
            </Typography>
          </Grid>
        ) : (
          filteredData.map((book: Book) => (
            <Grid size = {{xs:12, sm:6, md:4}}  key={book.id}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: '100%' }}>
                <CardComponent book={book} />
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </StyledContainer>
  );
};

export default Home;
