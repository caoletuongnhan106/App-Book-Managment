import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type { Book } from '../types';

interface BookState {
  books: Book[];
}

interface BookAction {
  type: 'ADD_BOOK' | 'EDIT_BOOK' | 'DELETE_BOOK' | 'SET_BOOKS';
  payload: any;
}

const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'EDIT_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? { ...book, ...action.payload.updatedBook }
            : book
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
  books: Book[];
  addBook: (formData: FormData) => void;
  updateBook: (id: string, formData: FormData) => void;
  deleteBook: (id: string) => void;
  setBooks: (books: Book[]) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

const initBookState = (): BookState => {
  try {
    const stored = localStorage.getItem('books');
    return stored ? { books: JSON.parse(stored) } : { books: [] };
  } catch {
    return { books: [] };
  }
};

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bookReducer, undefined, initBookState);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(state.books));
  }, [state.books]);

  const parseFormData = (formData: FormData): Book => {
    const book: Partial<Book> = {};
  
    formData.forEach((value, key) => {
      if (key === 'year' || key === 'quantity') {
        book[key as 'year' | 'quantity'] = Number(value);
      } else if (key === 'isAvailable') {
        book.isAvailable = value === 'true';
      } else if (key === 'image') {
        const file = value as File;
        if (file && file.name) {
          book.imageUrl = URL.createObjectURL(file);
        }
      } else if (key === 'description') {
        book.description = value.toString();
      } else {
        (book as any)[key] = value;
      }
    });
  
    if (!book.id) book.id = crypto.randomUUID();
    if (!book.createdAt) book.createdAt = new Date().toISOString();
  
    return book as Book;
  };
  

  const addBook = (formData: FormData) => {
    const book = parseFormData(formData);
    dispatch({ type: 'ADD_BOOK', payload: book });
  };

  const updateBook = (id: string, formData: FormData) => {
    const updatedBook = parseFormData(formData);
    dispatch({ type: 'EDIT_BOOK', payload: { id, updatedBook } });
  };

  const deleteBook = (id: string) => {
    dispatch({ type: 'DELETE_BOOK', payload: id });
  };

  const setBooks = (books: Book[]) => {
    dispatch({ type: 'SET_BOOKS', payload: books });
  };

  return (
    <BookContext.Provider
      value={{ books: state.books, addBook, updateBook, deleteBook, setBooks }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context)
    throw new Error('useBookContext must be used within a BookProvider');
  return context;
};
