import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import Login from './pages/LoginForm';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AdminLoans from './pages/AdminLoans';
import UserLoans from './pages/UserLoans';
import { CssBaseline } from '@mui/material';
import {type ReactNode } from 'react';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const RoleBasedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: ReactNode;
}) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
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
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/admin/loans',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <AdminLoans />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/user/loans',
        element: (
          <RoleBasedRoute allowedRoles={['user']}>
            <UserLoans />
          </RoleBasedRoute>
        ),
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