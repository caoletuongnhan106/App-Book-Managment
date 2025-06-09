import { useAuth } from '../context/AuthContext';

const useCheckRole = (requiredRole: string) => {
  const { user } = useAuth();
  const hasRole = user && user.role === requiredRole;
  return hasRole;
};

export default useCheckRole;