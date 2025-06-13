import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import type { Book } from '../types';
import noImage from '../assets/no-image.jpg';
import useDialog from '../hooks/useDialog';
import CustomDialog from './CustomDialog';
import EditBookFormContent from './EditBookFormContent';
import DeleteConfirmationContent from './DeleteConfirmationContent';
import useCheckRole from '../hooks/useCheckRole';

interface CardProps {
  book: Book;
}

const CardComponent: React.FC<CardProps> = ({ book }) => {
  const isAdmin = useCheckRole('admin');
  const { open, close, dialogProps } = useDialog();

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
      undefined
    );
  };

  return (
    <>
      <Card sx={{ width: 300, m: 1 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={book.imageUrl || noImage}
          title={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {book.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity: {book.quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {book.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available: {book.isAvailable ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Condition: {book.bookCondition}
          </Typography>
        </CardContent>
        {isAdmin && (
          <CardActions>
            <Button size="small" onClick={handleOpenEditDialog}>
              Edit
            </Button>
            <Button size="small" color="error" onClick={handleOpenDeleteDialog}>
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
      <CustomDialog
        open={dialogProps.open}
        onClose={close}
        title={dialogProps.title}
        maxWidth={dialogProps.maxWidth}
        fullWidth={dialogProps.fullWidth}
        actions={dialogProps.actions}
      >
        {dialogProps.content}
      </CustomDialog>
    </>
  );
};

export default CardComponent;