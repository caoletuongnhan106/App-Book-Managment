import { Typography, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useBookContext } from '../context/BookContext';
import { deleteBookApi } from '../api/mockApi';

interface DeleteConfirmationContentProps {
  bookId: string;
  bookTitle: string;
  onClose: () => void;
}

const DeleteConfirmationContent: React.FC<DeleteConfirmationContentProps> = ({ bookId, bookTitle, onClose }) => {
  const { deleteBook } = useBookContext();

  const mutation = useMutation({
    mutationFn: () => deleteBookApi(),
    onSuccess: () => {
      deleteBook(bookId); 
      onClose();
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <>
      <Typography>
        Are you sure you want to delete the book <strong>{bookTitle}</strong>?
      </Typography>
      <div>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteConfirmationContent;