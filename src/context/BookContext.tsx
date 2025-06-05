import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Book } from '../types';

interface BookState {
  books: Book[];
}

interface BookAction {
  type: 'ADD_BOOK' | 'EDIT_BOOK' | 'DELETE_BOOK';
  payload: any;
}

const initialState: BookState = {
  books: [],
};

const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'EDIT_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? { ...book, ...action.payload.updatedBook } : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    default:
      return state;
  }
};

interface BookContextType {
  state: BookState;
  addBook: (book: Book) => void;
  editBook: (id: string, updatedBook: Book) => void;
  deleteBook: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  const addBook = (book: Book) => {
    dispatch({ type: 'ADD_BOOK', payload: book });
  };

  const editBook = (id: string, updatedBook: Book) => {
    dispatch({ type: 'EDIT_BOOK', payload: { id, updatedBook } });
  };

  const deleteBook = (id: string) => {
    dispatch({ type: 'DELETE_BOOK', payload: id });
  };

  return (
    <BookContext.Provider value={{ state, addBook, editBook, deleteBook }}>
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