import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Grid } from '@mui/material';
import { useBookContext } from '../context/BookContext';
import CustomForm from './CustomForm';
import CustomTextField from './inputs/CustomTextField';
import CustomAutocomplete from './inputs/CustomAutocomplete';
import CustomCheckbox from './inputs/CustomCheckbox';
import CustomRadioGroup from './inputs/CustomRadioGroup';
import { useMutation } from '@tanstack/react-query';
import { addBookApi } from '../api/mockApi';
import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  year: yup.number().required('Year is required').min(0, 'Year must be a positive number').typeError('Year must be a number'),
  quantity: yup.number().required('Quantity is required').min(0, 'Quantity must be a positive number').typeError('Quantity must be a number'),
  category: yup.string().required('Category is required'),
  isAvailable: yup.boolean().required('Availability is required'),
  bookCondition: yup.string().required('Book condition is required').oneOf(['new', 'used'], 'Select a valid condition'),
}).required();

const categories = ['Fiction', 'Non-Fiction', 'Science', 'History'];
const bookConditions = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
];

const FormFields: React.FC = () => {
  return (
    <Box sx={{ mb: 3, backgroundColor: 'background.default', p: 2, borderRadius: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs:12, sm:6, md:3}}>
          <CustomTextField name="title" label="Title" />
        </Grid>
        <Grid size= {{ xs:12, sm:6, md:3}}>
          <CustomTextField name="author" label="Author" />
        </Grid>
        <Grid size = {{xs:12, sm: 6, md:2 }}>
          <CustomTextField name="year" label="Year" type="number" />
        </Grid>
        <Grid size = {{xs: 12, sm:6, md: 2 }}>
          <CustomTextField name="quantity" label="Quantity" type="number" />
        </Grid>
        <Grid size= {{ xs:12, sm:6, md:3}}>
          <CustomAutocomplete name="category" label="Category" options={categories} />
        </Grid>
        <Grid size= {{ xs:12, sm:6, md:3}}>
          <CustomCheckbox name="isAvailable" label="Available" />
        </Grid>
        <Grid size= {{ xs:12, sm:6, md:3}}>
          <CustomRadioGroup name="bookCondition" options={bookConditions} label={''} />
        </Grid>
        <Grid size= {{ xs:12, sm:6, md:2}}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Book
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const AddBookForm: React.FC = () => {
  const { addBook } = useBookContext();

  const mutation = useMutation({
    mutationFn: (data: any) => addBookApi(data),
    onSuccess: (data) => {
      addBook(data);
    },
  });

  const onSubmit = (data: any, methods: any) => {
    mutation.mutate({
      id: uuidv4(),
      title: data.title,
      author: data.author,
      year: Number(data.year),
      quantity: Number(data.quantity),
      category: data.category,
      isAvailable: data.isAvailable,
      bookCondition: data.bookCondition,
    });
    methods.reset();
  };

  return (
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
      }}
      validationSchema={schema}
    >
      <FormFields />
    </CustomForm>
  );
};

export default AddBookForm;