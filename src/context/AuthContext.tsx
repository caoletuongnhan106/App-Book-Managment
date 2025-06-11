import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
  role: string;
}

interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const testAccounts = [
  { email: 'admin@gmail.com', password: '123456', role: 'admin' },
  { email: 'user@gmail.com', password: '123456', role: 'user' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    return new Promise((resolve) => {
      const account = testAccounts.find(
        (acc) => acc.email === email && acc.password === password
      );
      if (account) {
        setUser({ email, role: account.role });
        resolve({ success: true, user: { email, role: account.role } });
      } else {
        resolve({ success: false, error: 'Invalid email or password' });
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;