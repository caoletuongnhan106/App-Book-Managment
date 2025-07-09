import React from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink, useLocation} from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Books', icon: <MenuBookIcon />, path: '/admin/books' },
  { text: 'Users', icon: <GroupIcon />, path: '/admin/users' },
];

const AdminSidebar: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const location = useLocation();

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#1e1e2f',
          color: '#fff',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink key={item.path} to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton selected={isActive}>
                <ListItemIcon sx={{ color: '#90caf9' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </NavLink>
          );
        })}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
