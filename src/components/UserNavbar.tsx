import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoanPage = () => {
    navigate('/user/loans');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      sx={{
        background: '#ffffff',
        p: 2,
        borderRadius: 2,
        mb: 2,
        boxShadow: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography fontWeight={600}>Xin chào, {user?.email}</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleLoanPage}>
          Mượn / Trả sách
        </Button>
        <Button variant="contained" onClick={handleProfile}>
          Trang cá nhân
        </Button>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    </Box>
  );
};

export default UserNavbar;
