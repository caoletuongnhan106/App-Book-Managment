import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          transition: 'transform 0.3s ease-in-out',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BookProvider>
          <RouterProvider router={router} />
        </BookProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
