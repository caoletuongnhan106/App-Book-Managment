import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Slide
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Books', icon: <MenuBookIcon />, path: '/admin/books' },
  { text: 'Users', icon: <GroupIcon />, path: '/admin/users' },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(prev => !prev);
  };

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: '#1e1e2f',
        height: '100%',
        color: 'white',
        p: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Admin Menu</Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <List>
        {menuItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              to={item.path}
              key={item.text}
              style={{ textDecoration: 'none' }}
              onClick={() => isMobile && setOpen(false)}
            >
              <ListItemButton
                selected={isActive}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: isActive ? '#2c2c44' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#2c2c44',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#90caf9' : '#bbb' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: isActive ? '#90caf9' : '#bbb',
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                />
              </ListItemButton>
            </NavLink>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Library Management System - Admin
          </Typography>
        </Toolbar>
      </AppBar>
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#1e1e2f',
              color: '#fff',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
      {isMobile && (
        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
          <Drawer
            variant="temporary"
            open={open}
            onClose={toggleDrawer}
            sx={{
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                backgroundColor: '#1e1e2f',
                color: '#fff',
              },
            }}
          >
            {drawer}
          </Drawer>
        </Slide>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
