import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import type { ReactNode } from 'react';
import Login from './pages/LoginForm';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import AdminLoans from './pages/admin/AdminLoans';
import UserLoans from './pages/user/UserLoans';
import Dashboard from './pages/admin/Dashboard';
import ManageBooks from './pages/admin/ManageBooks';
import ManageUsers from './pages/admin/ManageUsers';
import AdminLayout from './layouts/AdminLayout';
import ResponsiveLayout from './layouts/ResponsiveLayout';

const ProtectedRoute = () => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <div style={{ padding: 20 }}>Đang tải dữ liệu...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const RoleBasedRoute = ({ allowedRoles, children }: { allowedRoles: string[]; children: ReactNode }) => {
  const { user, isAuthLoading } = useAuth();
  if (isAuthLoading) return <div style={{ padding: 20 }}>Đang tải dữ liệu...</div>;
  if (!user || !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ResponsiveLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'profile', element: <Profile /> },
          {
            path: 'admin/loans',
            element: (
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminLoans />
              </RoleBasedRoute>
            ),
          },
          {
            path: 'user/loans',
            element: (
              <RoleBasedRoute allowedRoles={["user"]}>
                <UserLoans />
              </RoleBasedRoute>
            ),
          },
        ],
      },
    ],
  },

  {
    path: '/admin',
    element: (
      <RoleBasedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </RoleBasedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'books', element: <ManageBooks /> },
      { path: 'users', element: <ManageUsers /> },
    ],
  },

  { path: '*', element: <NotFound /> },
]);

