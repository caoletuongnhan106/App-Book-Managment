import { useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useHomeActions = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = useMemo(() => () => logout(), [logout]);

  const goToLoanPage = useMemo(() => () => {
    if (user?.role === 'admin') navigate('/admin/loans');
    else if (user?.role === 'user') navigate('/user/loans');
  }, [navigate, user?.role]);

  const goToProfile = useMemo(() => () => navigate('/profile'), [navigate]);

  return { handleLogout, goToLoanPage, goToProfile };
};