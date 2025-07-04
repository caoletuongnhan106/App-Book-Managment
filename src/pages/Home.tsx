import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { useBookContext } from '../context/BookContext';
import AddBookForm from '../components/AddBookForm';
import { styled } from '@mui/material/styles';
import CardComponent from '../components/Card';
import type { Book } from '../types';

const StyledContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)',
  minHeight: '100vh',
  padding: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
  position: 'relative',
  overflow: 'hidden',
}));

const StyledOverlay = styled(Box)(({  }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(236, 239, 241, 0.3)',
  zIndex: 0,
}));

const StyledCardWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '20px',
  background: '#eceff1',
  border: '1px solid #b0bec5',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-4px)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #0288d1, #01579b)',
  color: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(90deg, #01579b, #003c8f)',
    boxShadow: '0 6px 20px rgba(0, 60, 143, 0.4)',
    transform: 'translateY(-3px)',
  },
}));

const StyledTextField = styled(TextField)(({  }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px',
    backgroundColor: '#eceff1',
    '& fieldset': {
      borderColor: '#4fc3f7',
    },
    '&:hover fieldset': {
      borderColor: '#0288d1',
      boxShadow: '0 0 8px rgba(2, 136, 209, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#01579b',
      boxShadow: '0 0 10px rgba(1, 87, 155, 0.4)',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#0288d1',
  },
}));

const Home: React.FC = () => {
  const { user, logout } = useAuth(); 
  const { state } = useBookContext();
  const navigate = useNavigate();
  const books = state.books || [];

  const [searchTerm, setSearchTerm] = useState('');

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

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <StyledContainer>
      <StyledOverlay />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4, p: 2, background: 'rgba(255, 255, 255, 0.3)', borderRadius: '15px' }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#01579b', fontWeight: 600, textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}
          >
            Xin chào, {user?.email}
          </Typography>
          <Stack direction="row" spacing={2}>
            <StyledButton variant="contained" onClick={handleLoanPage}>
              {user?.role === 'admin' ? 'Quản lý mượn sách' : 'Mượn / Trả sách'}
            </StyledButton>
            <StyledButton variant="contained" onClick={handleProfile}>
              Trang cá nhân
            </StyledButton>
            <StyledButton variant="contained" onClick={handleLogout}>
              Logout
            </StyledButton>
          </Stack>
        </Stack>

        <Typography
          variant="h3"
          align="center"
          color="primary"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#01579b',
            mb: 5,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 1s ease',
          }}
        >
          Library Management System
        </Typography>

        {user?.role === 'admin' && <AddBookForm />}

        <StyledTextField
          label="Tìm kiếm sách (Tiêu đề, Tác giả, Thể loại)"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Grid container spacing={3}>
          {filteredData.length === 0 ? (
            <Grid size = {{xs:12}}>
              <Typography align="center" sx={{ color: '#78909c', fontStyle: 'italic' }}>
                Không tìm thấy sách phù hợp.
              </Typography>
            </Grid>
          ) : (
            filteredData.map((book: Book) => (
              <Grid size = {{xs:12, sm:6, md:4}} key={book.id} sx={{ animation: 'fadeIn 1s ease' }}>
                <StyledCardWrapper>
                  <CardComponent book={book} />
                </StyledCardWrapper>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </StyledContainer>
  );
};

export default Home;