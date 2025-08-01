import { useEffect, useState } from 'react';
import { useLoanManagement } from './useLoanManagement';
import { type Book } from '../types';
import { useBookContext } from '../context/BookContext';

export const useAvailableBooks = (): Book[] => {
  const { books } = useBookContext(); 
  const { loans } = useLoanManagement(); 

  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);

  useEffect(() => {
    const borrowedBookIds = loans.map((loan) => Number(loan.bookId));
    const filteredBooks = books.filter(
      (book) =>
        book.quantity > 0 &&
        book.isAvailable &&
        !borrowedBookIds.includes(Number(book.id))
    );
    setAvailableBooks(filteredBooks);
  }, [books, loans]);
  

  return availableBooks;
};
