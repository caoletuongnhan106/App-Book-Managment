import {
  Card, CardContent, CardMedia, Typography, CardActions,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { useState } from 'react';
import type { Book } from '../types';
import noImage from '../assets/no-image.jpg';
import useDialog from '../hooks/useDialog';
import CustomDialog from './CustomDialog';
import EditBookFormContent from './EditBookFormContent';
import DeleteConfirmationContent from './DeleteConfirmationContent';
import useCheckRole from '../hooks/useCheckRole';
import { useLoanManagement } from '../hooks/useLoanManagement';

interface CardProps {
  book: Book & { id: string };
}

const CardComponent: React.FC<CardProps> = ({ book }) => {
  const isAdmin = useCheckRole('admin');
  const { open, close, dialogProps } = useDialog();
  const { handleBorrow, handleReturn, loans, loading } = useLoanManagement();
  const [openBorrowDialog, setOpenBorrowDialog] = useState(false);
  const [returnDate, setReturnDate] = useState('');

  const currentLoan = Array.isArray(loans)
    ? loans.find((l) => l.bookId === book.id && !l.returnDate)
    : null;

  const handleOpenEditDialog = () => {
    open(
      'Edit Book',
      <EditBookFormContent book={book} onClose={close} />,
      undefined,
      'md',
      true
    );
  };

  const handleOpenDeleteDialog = () => {
    open(
      'Confirm Delete',
      <DeleteConfirmationContent bookId={book.id} bookTitle={book.title} onClose={close} />,
    );
  };

  const handleBorrowClick = () => {
    setOpenBorrowDialog(true);
  };

  const confirmBorrow = async () => {
    if (!book.id || !returnDate) return;
    await handleBorrow(book.id, book.title);
    setOpenBorrowDialog(false);
    setReturnDate('');
  };

  const handleReturnClick = async () => {
    if (currentLoan?.id) {
      await handleReturn(currentLoan.id);
    }
  };

  return (
    <>
      <Card sx={{ width: 300, m: 1 }}>
        <CardMedia sx={{ height: 140 }} image={book.imageUrl || noImage} title={book.title} />
        <CardContent>
          <Typography gutterBottom variant="h5">{book.title}</Typography>
          <Typography variant="body2">Author: {book.author}</Typography>
          <Typography variant="body2">Year: {book.year}</Typography>
          <Typography variant="body2">Quantity: {book.quantity}</Typography>
          <Typography variant="body2">Category: {book.category}</Typography>
          <Typography variant="body2">Available: {book.isAvailable ? 'Yes' : 'No'}</Typography>
          <Typography variant="body2">Condition: {book.bookCondition}</Typography>
        </CardContent>
        <CardActions>
          {!isAdmin ? (
            <>
              <Button
                size="small"
                variant="contained"
                onClick={handleBorrowClick}
                disabled={Boolean(currentLoan) || book.quantity <= 0 || loading}
              >
                MƯỢN SÁCH
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={handleReturnClick}
                disabled={!currentLoan || loading}
              >
                TRẢ SÁCH
              </Button>
            </>
          ) : (
            <>
              <Button size="small" onClick={handleOpenEditDialog}>Edit</Button>
              <Button size="small" color="error" onClick={handleOpenDeleteDialog}>Delete</Button>
            </>
          )}
        </CardActions>
      </Card>

      <CustomDialog {...dialogProps} onClose={close}>
        {dialogProps.content}
      </CustomDialog>

      <Dialog open={openBorrowDialog} onClose={() => setOpenBorrowDialog(false)}>
        <DialogTitle>Xác nhận mượn sách</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc muốn mượn sách "{book.title}"?</Typography>
          <TextField
            fullWidth
            type="date"
            label="Ngày trả dự kiến"
            InputLabelProps={{ shrink: true }}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBorrowDialog(false)}>Hủy</Button>
          <Button onClick={confirmBorrow} color="primary" disabled={!returnDate}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardComponent;
