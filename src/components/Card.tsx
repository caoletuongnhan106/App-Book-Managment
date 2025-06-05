import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import EditBookDialog from './EditBookDialog';
import type { Book } from '../types';
import noImage from '../assets/no-image.jpg';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

interface CardProps {
  book: Book;
}

const CardComponent: React.FC<CardProps> = ({ book }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
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
        <CardActions>
          <Button size="small" onClick={handleOpenEditDialog}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={handleOpenDeleteDialog}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <EditBookDialog book={book} open={openEditDialog} onClose={handleCloseEditDialog} />
      <DeleteConfirmationDialog
        bookId={book.id}
        bookTitle={book.title}
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      />
    </>
  );
};

export default CardComponent;