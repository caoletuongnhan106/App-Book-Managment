import { createContext, useContext, useState, useEffect } from 'react';
import type { Book } from '../types';

interface BookContextType {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const initialBooks: Book[] = [
      { id: '1', title: 'Book One', author: 'Author A', year: 2020, quantity: 5 },
      { id: '2', title: 'Book Two', author: 'Author B', year: 2021, quantity: 3 },
    ];
    localStorage.setItem('books', JSON.stringify(initialBooks));
    setBooks(initialBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};