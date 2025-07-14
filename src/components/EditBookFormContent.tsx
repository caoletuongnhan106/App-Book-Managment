import {
  Box,
  Grid,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import CustomForm from './CustomForm';
import CustomTextField from './inputs/CustomTextField';
import CustomAutocomplete from './inputs/CustomAutocomplete';
import CustomCheckbox from './inputs/CustomCheckbox';
import CustomRadioGroup from './inputs/CustomRadioGroup';
import UploadFile from './inputs/UploadFile';
import { useMutation } from '@tanstack/react-query';
import { editBookApi } from '../api/mockApi';
import { useBookContext } from '../context/BookContext';
import type { Book } from '../types';
import * as yup from 'yup';

interface EditBookFormContentProps {
  book: Book;
  onClose: () => void;
}

const schema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  year: yup.number().required().min(0).typeError('Year must be a number'),
  quantity: yup.number().required().min(0).typeError('Quantity must be a number'),
  category: yup.string().required(),
  isAvailable: yup.boolean().required(),
  bookCondition: yup.string().required().oneOf(['new', 'used']),
  image: yup.mixed().nullable(),
});

const categories = ['Fiction', 'Non-Fiction', 'Science', 'History'];
const bookConditions = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
];

const EditBookFormContent: React.FC<EditBookFormContentProps> = ({ book, onClose }) => {
  const { editBook } = useBookContext();

  const mutation = useMutation({
    mutationFn: (data: Book) => editBookApi(data),
    onSuccess: (data) => {
      editBook(book.id, data);
      onClose();
    },
  });

  const onSubmit = (data: any) => {
    const imageFile = data.image as File | null;
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : book.imageUrl;

    mutation.mutate({
      id: book.id,
      title: data.title,
      author: data.author,
      year: Number(data.year),
      quantity: Number(data.quantity),
      category: data.category,
      isAvailable: data.isAvailable,
      bookCondition: data.bookCondition,
      imageUrl,
    });
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom color="primary">
        ✏️ Chỉnh sửa thông tin sách
      </Typography>

      <CustomForm
        onSubmit={onSubmit}
        defaultValues={{
          title: book.title,
          author: book.author,
          year: book.year.toString(),
          quantity: book.quantity.toString(),
          category: book.category,
          isAvailable: book.isAvailable,
          bookCondition: book.bookCondition,
          image: null,
        }}
        validationSchema={schema}
      >
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size = {{ xs:12, sm:6}}>
            <CustomTextField name="title" label="Title" />
          </Grid>
          <Grid size = {{ xs:12, sm:6}}>
            <CustomTextField name="author" label="Author" />
          </Grid>
          <Grid size = {{ xs:6, sm:4}}>
            <CustomTextField name="year" label="Year" type="number" />
          </Grid>
          <Grid size = {{ xs:6, sm:4}}>
            <CustomTextField name="quantity" label="Quantity" type="number" />
          </Grid>
          <Grid size = {{ xs:12, sm:6}}>
            <CustomAutocomplete name="category" label="Category" options={categories} />
          </Grid>
          <Grid size = {{ xs:6, sm:6}}>
            <CustomCheckbox name="isAvailable" label="Available" />
          </Grid>
          <Grid size = {{ xs:12}}>
            <CustomRadioGroup name="bookCondition" options={bookConditions} label="Condition" />
          </Grid>
          <Grid size = {{ xs:12}}>
            <UploadFile name="image" accept="image/*" />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Stack>
      </CustomForm>
    </Box>
  );
};

export default EditBookFormContent;
