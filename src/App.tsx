import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAuth } from './context/AuthContext';
import { useBookContext } from './context/BookContext';
import AddBookForm from './components/AddBookForm';
import CardComponent from './components/Card';
import LoginForm from './components/LoginForm';
import { Container, Box, Typography, Button } from '@mui/material';

const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const Home = () => {
  const { user, logout } = useAuth();
  const { state } = useBookContext();
  const books = state.books;

  const bookList = useMemo(() => {
    return books ? books.map((book) => <CardComponent key={book.id} book={book} />) : [];
  }, [books]);

  const handleLogout = () => {
    logout();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, backgroundColor: 'background.default', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Library Management System
      </Typography>
      {user?.role === 'admin' && <AddBookForm />}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mt: 3,
          gap: 2,
        }}
      >
        {books && books.length === 0 ? (
          <Typography align="center" sx={{ width: '100%', color: 'text.secondary' }}>
            No books available.
          </Typography>
        ) : (
          bookList
        )}
      </Box>
    </Container>
  );
};

const NotFound = () => {
  return (
    <Typography variant="h4" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
      404 - Page Not Found
    </Typography>
  );
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;