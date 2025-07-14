import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Grid,
  Stack,
  Button,
  Typography,
} from '@mui/material';
import { useBookContext } from '../context/BookContext';
import CustomForm from './CustomForm';
import CustomTextField from './inputs/CustomTextField';
import CustomAutocomplete from './inputs/CustomAutocomplete';
import CustomCheckbox from './inputs/CustomCheckbox';
import CustomRadioGroup from './inputs/CustomRadioGroup';
import UploadFile from './inputs/UploadFile';
import { useMutation } from '@tanstack/react-query';
import { addBookApi } from '../api/mockApi';
import * as yup from 'yup';

interface AddBookFormProps {
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

const AddBookForm: React.FC<AddBookFormProps> = ({ onClose }) => {
  const { addBook } = useBookContext();

  const mutation = useMutation({
    mutationFn: (data: any) => addBookApi(data),
    onSuccess: (data) => {
      addBook(data);
      onClose();
    },
  });

  const onSubmit = (data: any, methods: any) => {
    const imageFile = data.image as File | null;
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : undefined;

    mutation.mutate({
      id: uuidv4(),
      title: data.title,
      author: data.author,
      year: Number(data.year),
      quantity: Number(data.quantity),
      category: data.category,
      isAvailable: data.isAvailable,
      bookCondition: data.bookCondition,
      imageUrl,
    });

    methods.reset();
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom color="primary">
        ➕ Thêm sách mới
      </Typography>

      <CustomForm
        onSubmit={onSubmit}
        defaultValues={{
          title: '',
          author: '',
          year: '',
          quantity: '',
          category: '',
          isAvailable: false,
          bookCondition: 'new',
          image: null,
        }}
        validationSchema={schema}
      >
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size = {{xs:12, sm:6}} >
            <CustomTextField name="title" label="Title" />
          </Grid>
          <Grid size = {{xs:12, sm:6}}>
            <CustomTextField name="author" label="Author" />
          </Grid>
          <Grid size = {{xs:6, sm:4}}>
            <CustomTextField name="year" label="Year" type="number" />
          </Grid>
          <Grid size = {{xs:6, sm:4}}>
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
        </Grid>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add Book
          </Button>
        </Stack>
      </CustomForm>
    </Box>
  );
};

export default AddBookForm;
