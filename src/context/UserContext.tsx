import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  editUser: (user: User) => void;
  deleteUser: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => setUsers((prev) => [...prev, user]);
  const editUser = (updated: User) =>
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  const deleteUser = (id: number) => setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
