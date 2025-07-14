import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBookForm from '../../components/AddBookForm';
import EditBookForm from '../../components/EditBookFormContent';
import { useBookContext } from '../../context/BookContext';
import type { Book } from '../../types';

const ManageBooks: React.FC = () => {
  const theme = useTheme();
  const { state, deleteBook } = useBookContext();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setEditOpen(true);
  };

  const handleCloseAdd = () => setAddOpen(false);
  const handleCloseEdit = () => setEditOpen(false);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="primary"
        textAlign="center"
        gutterBottom
      >
        📚 Quản lý sách
      </Typography>

      <Box sx={{ textAlign: 'right', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 'bold',
            background: theme.palette.primary.main,
            '&:hover': {
              background: theme.palette.primary.dark,
            },
          }}
        >
          Thêm sách
        </Button>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
        gap={3}
      >
        {state.books.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ gridColumn: '1 / -1' }}
          >
            Chưa có sách nào trong thư viện.
          </Typography>
        ) : (
          state.books.map((book) => (
            <Card
              key={book.id}
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✍️ Tác giả: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🗂 Thể loại: {book.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📦 Số lượng: {book.quantity}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', pr: 2, pb: 2 }}>
                <IconButton
                  onClick={() => handleEdit(book)}
                  color="primary"
                  sx={{ transition: '0.2s', '&:hover': { color: '#1565c0' } }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteBook(book.id)}
                  color="error"
                  sx={{ transition: '0.2s', '&:hover': { color: '#b71c1c' } }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        )}
      </Box>

      <Modal open={addOpen} onClose={handleCloseAdd}>
        <Box sx={modalStyle}>
          <AddBookForm onClose={handleCloseAdd} />
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={handleCloseEdit}>
        <Box sx={modalStyle}>
          {selectedBook && <EditBookForm book={selectedBook} onClose={handleCloseEdit} />}
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  width: { xs: '90%', sm: 500 },
};

export default ManageBooks;
