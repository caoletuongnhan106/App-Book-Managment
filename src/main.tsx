import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { SnackbarProvider } from 'notistack'; 

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider 
      maxSnack={3} 
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}> 
        <AuthProvider>
          <BookProvider>
            <App />
          </BookProvider>
        </AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
