import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

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

 const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testAccounts, setTestAccounts] = useState<TestAccount[]>(initialTestAccounts);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('User state updated:', user);
    console.log('Current testAccounts:', testAccounts);
  }, [user, testAccounts]);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      console.log('Attempting login with:', { email, password });
      console.log('Available testAccounts:', testAccounts);
      const account = testAccounts.find((acc) => acc.email === email && acc.password === password);
      if (account) {
        console.log('Account found:', account);
        setUser({ id: account.id, email: account.email, role: account.role });
        return { success: true, user: { id: account.id, email: account.email, role: account.role } };
      } else {
        console.log('No account found, checking matches:', testAccounts.some(acc => acc.email === email && acc.password === password));
        return { success: false, error: 'Invalid email or password' };
      }
    },
    [testAccounts]
  );

  const register = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      console.log('Attempting register with:', { email, password });
      console.log('Current testAccounts before check:', testAccounts);
      const existingAccount = testAccounts.find((acc) => acc.email === email);
      if (existingAccount) {
        console.log('Email already exists:', existingAccount);
        return { success: false, error: 'Email already exists' };
      }
      const newUser: TestAccount = {
        id: Date.now().toString(),
        email,
        password,
        role: RULE_ENUM.USER,
      };
      console.log('New user to add:', newUser);
      setTestAccounts((prev: TestAccount[]) => { 
        const updatedAccounts = [...prev, newUser];
        console.log('Updated testAccounts:', updatedAccounts);
        return updatedAccounts;
      });
      setUser({ id: newUser.id, email: newUser.email, role: newUser.role });
      console.log('User set to:', { id: newUser.id, email: newUser.email, role: newUser.role });
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

 const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { RULE_ENUM, AuthProvider, useAuth, AuthContext };