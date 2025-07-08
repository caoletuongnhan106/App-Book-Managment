import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface MenuItemProps {
  text: string;
  icon: React.ReactNode;
  path: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, icon, path, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <NavLink
      to={path}
      onClick={onClick}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <ListItemButton
        selected={isActive}
        sx={{
          backgroundColor: isActive ? '#2c2c44' : 'transparent',
          '&:hover': { backgroundColor: '#2c2c44' },
          borderRadius: 1,
          mx: 1,
          mt: 1,
        }}
      >
        <ListItemIcon sx={{ color: isActive ? '#90caf9' : '#bbbbbb' }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? '#90caf9' : '#bbbbbb',
          }}
        />
      </ListItemButton>
    </NavLink>
  );
};

export default MenuItem;