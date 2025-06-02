import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Book } from '../types';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [], 
};

type BookAction =
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'EDIT_BOOK'; payload: { id: string; updatedBook: Book } };

const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'EDIT_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload.updatedBook : book
        ),
      };
    default:
      return state;
  }
};

const BookContext = createContext<{
  state: BookState;
  addBook: (book: Book) => void;
  editBook: (id: string, updatedBook: Book) => void;
} | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  const addBook = (book: Book) => {
    dispatch({ type: 'ADD_BOOK', payload: book });
  };

  const editBook = (id: string, updatedBook: Book) => {
    dispatch({ type: 'EDIT_BOOK', payload: { id, updatedBook } });
  };

  return (
    <BookContext.Provider value={{ state, addBook, editBook }}>
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