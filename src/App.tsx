import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import Login from './pages/LoginForm';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline } from '@mui/material';

const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />, 
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
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;