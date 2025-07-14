import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useUserContext } from './UserContext';
import type { AuthUser, TestAccount, UserInList } from '../types/index';
import { RULE_ENUM } from '../types';

interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  updateAvatar: (newAvatar: string) => void;
  updateUserProfile: (updatedUser: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialTestAccounts: TestAccount[] = [
  {
    id: '1',
    email: 'admin@gmail.com',
    password: '123456',
    role: RULE_ENUM.ADMIN,
    name: 'Admin',
    birthYear: '1990',
  },
  {
    id: '2',
    email: 'user@gmail.com',
    password: '123456',
    role: RULE_ENUM.USER,
    name: 'User',
    birthYear: '2000',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testAccounts, setTestAccounts] = useState<TestAccount[]>(initialTestAccounts);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { addUser } = useUserContext();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsAuthLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const account = testAccounts.find(
        (acc) => acc.email === email && acc.password === password
      );
      if (account) {
        const { password: _, ...safeUser } = account;
        setUser(safeUser);
        localStorage.setItem('user', JSON.stringify(safeUser));
        return { success: true, user: safeUser };
      }
      return { success: false, error: 'Invalid email or password' };
    },
    [testAccounts]
  );

  const register = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const existingAccount = testAccounts.find((acc) => acc.email === email);
      if (existingAccount) {
        return { success: false, error: 'Email already exists' };
      }

      const newAccount: TestAccount = {
        id: Date.now().toString(),
        email,
        password,
        role: RULE_ENUM.USER,
        name: '',
        birthYear: '',
      };

      const { password: _, ...safeUser } = newAccount;
      setTestAccounts((prev) => [...prev, newAccount]);
      setUser(safeUser);
      localStorage.setItem('user', JSON.stringify(safeUser));

      const userForList: UserInList = {
        id: Number(newAccount.id),
        email,
        name: '',
        role: RULE_ENUM.USER,
        birthYear: '',
        avatar: '',
      };
      addUser(userForList);

      return { success: true, user: safeUser };
    },
    [testAccounts, addUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const updateAvatar = useCallback(
    (newAvatar: string) => {
      if (!user) return;

      setUser((prev) => (prev ? { ...prev, avatar: newAvatar } : null));
      setTestAccounts((prev) =>
        prev.map((acc) => (acc.id === user.id ? { ...acc, avatar: newAvatar } : acc))
      );
      localStorage.setItem('user', JSON.stringify({ ...user, avatar: newAvatar }));
    },
    [user]
  );

  const updateUserProfile = useCallback(
    (updatedUser: Partial<AuthUser>) => {
      if (!user) return;

      const updated = { ...user, ...updatedUser };
      setUser(updated);

      setTestAccounts((prev) =>
        prev.map((acc) => (acc.id === user.id ? { ...acc, ...updatedUser } : acc))
      );
      localStorage.setItem('user', JSON.stringify(updated));
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ user, isAuthLoading, login, register, logout, updateAvatar, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
