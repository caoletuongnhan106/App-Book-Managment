import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { BookProvider } from './context/BookContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useBookContext } from './context/BookContext';
import AddBookForm from './components/AddBookForm';
import CardComponent from './components/Card';
import LoginForm from './components/LoginForm';
import { Container, Box, Typography, Button, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppContent() {
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
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BookProvider>
            <CssBaseline />
            <AppContent />
          </BookProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;