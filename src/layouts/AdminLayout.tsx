import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListSubheader,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import { useAuth } from '../context/AuthContext'; 
import { useSidebar } from '../hooks/useSidebar'; 
import MenuItem from '../components/MenuItem'; 

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Books', icon: <MenuBookIcon />, path: '/admin/books' },
  { text: 'Users', icon: <GroupIcon />, path: '/admin/users' },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { isMobile, open, toggleDrawer, setOpen } = useSidebar();
  const { user } = useAuth();

  const drawerContent = React.useMemo(() => (
    <>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
        <Typography variant="h6" sx={{ color: '#fff' }}>
          Menu
        </Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
      <List
        subheader={
          <ListSubheader
            component="div"
            sx={{ backgroundColor: '#1e1e2f', color: '#ffffff', fontWeight: 'bold' }}
          >
            Main Menu
          </ListSubheader>
        }
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            text={item.text}
            icon={item.icon}
            path={item.path}
            onClick={() => isMobile && setOpen(false)}
          />
        ))}
      </List>
    </>
  ), [isMobile, toggleDrawer, setOpen]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Library Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={isMobile ? toggleDrawer : undefined}
        ModalProps={isMobile ? { keepMounted: true } : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1e1e2f',
            color: '#fff',
            borderRight: 'none',
            display: 'block',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          p: 3,
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Toolbar />
        <div>Current Path: {location.pathname}</div>
        <div>User: {user ? JSON.stringify(user) : 'Not logged in'}</div>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;