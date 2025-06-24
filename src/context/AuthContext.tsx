import React, { createContext, useContext, useState, useCallback } from 'react';

enum RULE_ENUM {
  ADMIN = 'admin',
  USER = 'user',
}

interface User {
  id: string;
  email: string;
  name?: string;
  role: RULE_ENUM;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialTestAccounts: TestAccount[] = [
  { id: '1', email: 'admin@gmail.com', password: '123456', role: RULE_ENUM.ADMIN },
  { id: '2', email: 'user@gmail.com', password: '123456', role: RULE_ENUM.USER },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testAccounts, setTestAccounts] = useState<TestAccount[]>(initialTestAccounts);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const account = testAccounts.find((acc) => acc.email === email && acc.password === password);
      if (account) {
        setUser({ id: account.id, email: account.email, role: account.role });
        return { success: true, user: { id: account.id, email: account.email, role: account.role } };
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
      const newUser: TestAccount = {
        id: Date.now().toString(),
        email,
        password,
        role: RULE_ENUM.USER,
      };
      setTestAccounts((prev) => [...prev, newUser]);
      setUser({ id: newUser.id, email: newUser.email, role: newUser.role });
      return { success: true, user: { id: newUser.id, email: newUser.email, role: newUser.role } };
    },
    [testAccounts]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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

export { RULE_ENUM, AuthContext };