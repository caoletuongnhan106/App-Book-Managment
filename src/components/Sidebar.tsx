import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
  } from '@mui/material';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import BarChartIcon from '@mui/icons-material/BarChart';
  import SettingsIcon from '@mui/icons-material/Settings';
  import { NavLink } from 'react-router-dom';
  
  const Sidebar = () => {
    const menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
      { text: 'Orders', icon: <ShoppingCartIcon />, path: '/admin/orders' },
    ];
  
    const analyticsItems = [
      { text: 'Reports', icon: <BarChartIcon />, path: '/admin/reports' },
      { text: 'Integrations', icon: <SettingsIcon />, path: '/admin/integrations' },
    ];
  
    return (
      <Drawer variant="permanent" sx={{ width: 240 }}>
        <Box sx={{ width: 240, p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Toolpad
          </Typography>
        </Box>
        <Divider />
        <List subheader={<Typography sx={{ px: 2, py: 1, fontWeight: 600 }}>Main items</Typography>}>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem key={text} component={NavLink} to={path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List subheader={<Typography sx={{ px: 2, py: 1, fontWeight: 600 }}>Analytics</Typography>}>
          {analyticsItems.map(({ text, icon, path }) => (
            <ListItem key={text} component={NavLink} to={path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  };
  
  export default Sidebar;
  