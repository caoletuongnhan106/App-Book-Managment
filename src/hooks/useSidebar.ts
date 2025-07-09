import { useState, useCallback } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

export const useSidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return { isMobile, open, toggleDrawer, setOpen };
};