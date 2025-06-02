import { v4 as uuidv4 } from 'uuid';
import { Box, Button } from '@mui/material';
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
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mb: 3,
        backgroundColor: 'background.default',
        p: 2,
        borderRadius: 1,
      }}
    >
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <CustomTextField name="title" label="Title" />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <CustomTextField name="author" label="Author" />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
        <CustomTextField name="year" label="Year" type="number" />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
        <CustomTextField name="quantity" label="Quantity" type="number" />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <CustomAutocomplete name="category" label="Category" options={categories} />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <CustomCheckbox name="isAvailable" label="Available" />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <CustomRadioGroup name="bookCondition" options={bookConditions} label={''} />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Book
        </Button>
      </Box>
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
      defaultValues={{ title: '', author: '', year: '', quantity: '', category: '', isAvailable: false, bookCondition: 'new' }}
      validationSchema={schema}
    >
      <FormFields />
    </CustomForm>
  );
};

export default AddBookForm;