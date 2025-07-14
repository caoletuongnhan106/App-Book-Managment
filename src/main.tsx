import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { UserProvider } from './context/UserContext'; 
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <UserProvider> {/* ✅ Đưa ra ngoài để AuthProvider dùng được */}
          <AuthProvider>
            <BookProvider>
              <App />
            </BookProvider>
          </AuthProvider>
        </UserProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
