import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Box } from '@mui/material';
import { useBookContext } from '../context/BookContext';
import Form from './CustomForm';
import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  year: yup
    .number()
    .required('Year is required')
    .min(0, 'Year must be a positive number')
    .typeError('Year must be a number'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .min(0, 'Quantity must be a positive number')
    .typeError('Quantity must be a number'),
}).required();

const FormFields: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

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
        <TextField
          fullWidth
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message as string}
          variant="outlined"
        />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <TextField
          fullWidth
          label="Author"
          {...register('author')}
          error={!!errors.author}
          helperText={errors.author?.message as string}
          variant="outlined"
        />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
        <TextField
          fullWidth
          type="number"
          label="Year"
          {...register('year')}
          error={!!errors.year}
          helperText={errors.year?.message as string}
          variant="outlined"
        />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
        <TextField
          fullWidth
          type="number"
          label="Quantity"
          {...register('quantity')}
          error={!!errors.quantity}
          helperText={errors.quantity?.message as string}
          variant="outlined"
        />
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

  const onSubmit = (data: any, methods: any) => {
    addBook({
      id: uuidv4(),
      title: data.title,
      author: data.author,
      year: Number(data.year),
      quantity: Number(data.quantity),
    });
    methods.reset();
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{ title: '', author: '', year: '', quantity: '' }}
      validationSchema={schema}
    >
      <FormFields />
    </Form>
  );
};

export default AddBookForm;