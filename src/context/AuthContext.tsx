import React, { createContext, useContext, useState } from 'react';

enum RULE_ENUM {
  ADMIN = 'admin',
  USER = 'user'
}

interface User {
  id: string;
  email: string;
  role: RULE_ENUM;
}

interface TestAccount extends User {
  password: string;
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
 
const testAccounts: TestAccount[] = [
  { id: '1', email: 'admin@gmail.com', password: '123456', role: RULE_ENUM.ADMIN },
  { id: '2', email: 'user@gmail.com', password: '123456', role: RULE_ENUM.USER },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    return new Promise((resolve, reject) => {
      const account = testAccounts.find(
        (acc) => acc.email === email && acc.password === password
      );
      if (account) {
        setUser({ id: account.id, email: account.email, role: account.role });
        resolve({ success: true, user: { id: account.id, email: account.email, role: account.role } });
      } else {
        reject(new Error('Invalid email or password'));
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export {RULE_ENUM};
export default AuthContext;