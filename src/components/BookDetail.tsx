import { useParams } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const BookDetail = () => {
  const { id } = useParams();
  const { books } = useBookContext();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return <Typography variant="h6">Không tìm thấy sách</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="400"
          image={book.imageUrl}
          alt={book.title}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">{book.title}</Typography>
          <Typography>Tác giả: {book.author}</Typography>
          <Typography>Loại: {book.category}</Typography>
          <Typography>Số lượng: {book.quantity}</Typography>
          <Typography>Ngày thêm: {new Date(book.createdAt).toLocaleDateString()}</Typography>
          <Typography mt={2}><strong>Mô tả:</strong></Typography>
          <Typography>{book.description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookDetail;
