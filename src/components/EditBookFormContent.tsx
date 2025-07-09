import { Box, Grid, Button } from '@mui/material';
import CustomForm from './CustomForm';
import CustomTextField from './inputs/CustomTextField';
import CustomAutocomplete from './inputs/CustomAutocomplete';
import CustomCheckbox from './inputs/CustomCheckbox';
import CustomRadioGroup from './inputs/CustomRadioGroup';
import UploadFile from './inputs/UploadFile';
import { useMutation } from '@tanstack/react-query';
import  type { Book } from '../types';
import { useBookContext } from '../context/BookContext';
import { editBookApi } from '../api/mockApi';
import * as yup from 'yup';

interface EditBookFormContentProps {
  book: Book;
  onClose: () => void;
}

const schema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  year: yup.number().required('Year is required').min(0, 'Year must be a positive number').typeError('Year must be a number'),
  quantity: yup.number().required('Quantity is required').min(0, 'Quantity must be a positive number').typeError('Quantity must be a number'),
  category: yup.string().required('Category is required'),
  isAvailable: yup.boolean().required('Availability is required'),
  bookCondition: yup.string().required('Book condition is required').oneOf(['new', 'used'], 'Select a valid condition'),
  image: yup.mixed().nullable(),
}).required();

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
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size = {{xs: 12, sm:6, md: 3}} >
            <CustomTextField name="title" label="Title" />
          </Grid>
          <Grid size = {{xs: 12, sm:6, md: 3}}>
            <CustomTextField name="author" label="Author" />
          </Grid>
          <Grid size = {{xs: 12, sm:6, md: 2}}>
            <CustomTextField name="year" label="Year" type="number" />
          </Grid>
          <Grid size = {{xs: 12, sm:6, md: 2}}>
            <CustomTextField name="quantity" label="Quantity" type="number" />
          </Grid>
          <Grid size = {{xs: 12, sm:6, md: 3}}>
            <CustomAutocomplete name="category" label="Category" options={categories} />
          </Grid>
          <Grid size = {{xs: 12, sm:6, md: 3}}>
            <CustomCheckbox name="isAvailable" label="Available" />
          </Grid>
          <Grid size = {{xs: 12, sm:6, md: 3}}>
            <CustomRadioGroup name="bookCondition" options={bookConditions} label={''} />
          </Grid>
          <Grid size = {{xs: 12, sm:6, md: 3}}>
            <UploadFile name="image" accept="image/*" />
          </Grid>
        </Grid>
      </Box>
      <div>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </div>
    </CustomForm>
  );
};

export default EditBookFormContent;