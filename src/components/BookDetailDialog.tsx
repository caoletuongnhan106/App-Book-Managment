import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Box,
  Stack,
  Divider,
} from '@mui/material';
import type { Book } from '../types';

export interface BookDetailDialogProps {
  open: boolean;
  onClose: () => void;
  book: Book;
}

const BookDetailDialog: React.FC<BookDetailDialogProps> = ({
  open,
  onClose,
  book,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Thông tin chi tiết sách
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {/* Ảnh bìa sách */}
          <Box
            component="img"
            src={book.imageUrl || '/no-image.png'}
            alt={book.title}
            sx={{
              width: 150,
              height: 200,
              objectFit: 'cover',
              borderRadius: 2,
              border: '1px solid #ccc',
              boxShadow: 1,
            }}
          />

          {/* Thông tin sách */}
          <Box flex={1}>
            <Typography gutterBottom>
              <strong>Tiêu đề:</strong> {book.title}
            </Typography>
            <Typography gutterBottom>
              <strong>Tác giả:</strong> {book.author}
            </Typography>
            <Typography gutterBottom>
              <strong>Thể loại:</strong> {book.category}
            </Typography>
            <Typography gutterBottom>
              <strong>Số lượng:</strong> {book.quantity}
            </Typography>
            <Typography gutterBottom>
              <strong>Ngày thêm:</strong>{' '}
              {book.createdAt
                ? new Date(book.createdAt).toLocaleDateString('vi-VN')
                : 'N/A'}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="bold">
          Mô tả
        </Typography>
        <Typography sx={{ mt: 1 }}>
          {book.description || 'Không có mô tả'}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDetailDialog;
