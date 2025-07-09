import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
const ResponsiveLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Library System
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ResponsiveLayout;
