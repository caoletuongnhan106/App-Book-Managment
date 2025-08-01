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
  year: yup
    .number()
    .required('Year is required')
    .min(0, 'Year must be positive')
    .typeError('Year must be a number'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .min(0, 'Quantity must be positive')
    .typeError('Quantity must be a number'),
  category: yup.string().required('Category is required'),
  isAvailable: yup.boolean().required(),
  bookCondition: yup.string().required().oneOf(['new', 'used']),
  image: yup.mixed().nullable(),
  description: yup.string().required('Description is required'),
});

const categories = ['Fiction', 'Non-Fiction', 'Science', 'History'];
const bookConditions = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
];

const EditBookFormContent: React.FC<EditBookFormContentProps> = ({ book, onClose }) => {
  const { updateBook } = useBookContext();

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append('id', book.id); 
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('year', data.year.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('category', data.category);
    formData.append('isAvailable', String(data.isAvailable));
    formData.append('bookCondition', data.bookCondition);
    formData.append('description', data.description); 
    formData.append('createdAt', new Date().toISOString());

    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (book.imageUrl) {
      formData.append('imageUrl', book.imageUrl); 
    }

    updateBook(book.id, formData);
    onClose();
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
          <Grid size = {{xs:12, sm:6}}>
            <CustomTextField name="title" label="Title" />
          </Grid>
          <Grid size = {{xs:12, sm:6}}>
            <CustomTextField name="author" label="Author" />
          </Grid>
          <Grid size = {{xs:12, sm:4}}>
            <CustomTextField name="year" label="Year" type="number" />
          </Grid>
          <Grid size = {{xs:12, sm:4}}>
            <CustomTextField name="quantity" label="Quantity" type="number" />
          </Grid>
          <Grid size = {{xs:12, sm:6}}>
            <CustomAutocomplete name="category" label="Category" options={categories} />
          </Grid>
          <Grid size = {{xs:6, sm:6}}>
            <CustomCheckbox name="isAvailable" label="Available" />
          </Grid>
          <Grid size = {{xs:12}}>
            <CustomRadioGroup name="bookCondition" options={bookConditions} label="Condition" />
          </Grid>
          <Grid size = {{xs:12}}>
            <UploadFile name="image" accept="image/*" />
          </Grid>
          <Grid size = {{xs:12}} >
            <CustomTextField name="description" label="Description" multiline minRows={3} fullWidth/>
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
