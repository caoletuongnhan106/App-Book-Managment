import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useBookContext } from '../context/BookContext';
import { deleteBookApi } from '../api/mockApi';

interface DeleteConfirmationDialogProps {
  bookId: string;
  bookTitle: string;
  open: boolean;
  onClose: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ bookId, bookTitle, open, onClose }) => {
  const { deleteBook } = useBookContext();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteBookApi(id),
    onSuccess: () => {
      deleteBook(bookId);
      onClose();
    },
  });

  const handleDelete = () => {
    mutation.mutate(bookId);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the book <strong>{bookTitle}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;