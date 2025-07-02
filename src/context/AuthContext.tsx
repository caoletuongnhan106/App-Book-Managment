import React, { createContext, useContext, useState, useCallback } from 'react';

export enum RULE_ENUM {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: RULE_ENUM;
  avatar?: string;
  birthYear?: string;
}

interface TestAccount extends User {
  password: string;
}

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  updateAvatar: (newAvatar: string) => void;
  updateUserProfile: (updatedUser: Partial<User>) => void;
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
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const account = testAccounts.find((acc) => acc.email === email && acc.password === password);
    if (account) {
      const { password: _, ...safeUser } = account;
      setUser(safeUser);
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Invalid email or password' };
  }, [testAccounts]);

  const register = useCallback(async (email: string, password: string): Promise<AuthResult> => {
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

    return { success: true, user: safeUser };
  }, [testAccounts]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateAvatar = useCallback((newAvatar: string) => {
    if (!user) return;

    setUser((prev) => prev ? { ...prev, avatar: newAvatar } : null);

    setTestAccounts((prev) =>
      prev.map((acc) => (acc.id === user.id ? { ...acc, avatar: newAvatar } : acc))
    );
  }, [user]);

  const updateUserProfile = useCallback((updatedUser: Partial<User>) => {
    if (!user) return;

    const updated = { ...user, ...updatedUser };
    setUser(updated);

    setTestAccounts((prev) =>
      prev.map((acc) =>
        acc.id === user.id ? { ...acc, ...updatedUser } : acc
      )
    );
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateAvatar, updateUserProfile }}
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

export { AuthContext };
