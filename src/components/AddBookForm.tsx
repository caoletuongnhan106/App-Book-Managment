import { useReducer, useCallback } from 'react';
import { useBookContext } from '../context/BookContext';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Box } from '@mui/material';

interface FormState {
  title: string;
  author: string;
  year: string;
  quantity: string;
}

type FormAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_AUTHOR'; payload: string }
  | { type: 'SET_YEAR'; payload: string }
  | { type: 'SET_QUANTITY'; payload: string }
  | { type: 'RESET' };

const initialState: FormState = {
  title: '',
  author: '',
  year: '',
  quantity: '',
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_AUTHOR':
      return { ...state, author: action.payload };
    case 'SET_YEAR':
      return { ...state, year: action.payload };
    case 'SET_QUANTITY':
      return { ...state, quantity: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const AddBookForm: React.FC = () => {
  const { addBook } = useBookContext();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!state.title || !state.author || !state.year || !state.quantity) {
        alert('Please fill in all fields');
        return;
      }
      const year = parseInt(state.year);
      const quantity = parseInt(state.quantity);
      if (isNaN(year) || isNaN(quantity) || year < 0 || quantity < 0) {
        alert('Year and quantity must be valid numbers');
        return;
      }
      addBook({
        id: uuidv4(),
        title: state.title,
        author: state.author,
        year,
        quantity,
      });
      dispatch({ type: 'RESET' });
    },
    [state, addBook]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
          <TextField
            fullWidth
            label="Title"
            value={state.title}
            onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
          />
        </Box>
        <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
          <TextField
            fullWidth
            label="Author"
            value={state.author}
            onChange={(e) => dispatch({ type: 'SET_AUTHOR', payload: e.target.value })}
          />
        </Box>
        <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
          <TextField
            fullWidth
            type="number"
            label="Year"
            value={state.year}
            onChange={(e) => dispatch({ type: 'SET_YEAR', payload: e.target.value })}
          />
        </Box>
        <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={state.quantity}
            onChange={(e) => dispatch({ type: 'SET_QUANTITY', payload: e.target.value })}
          />
        </Box>
        <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
          <Button type="submit" variant="contained" fullWidth>
            Add Book
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default AddBookForm;