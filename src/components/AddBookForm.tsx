import { useFormContext, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Box, RadioGroup, Radio, FormControlLabel, Checkbox, Autocomplete, Typography } from '@mui/material';
import { useBookContext } from '../context/BookContext';
import CustomForm from './CustomForm';
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

const FormFields: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();

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
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
              label="Title"
              {...field}
              error={!!errors.title}
              helperText={errors.title?.message as string}
              variant="outlined"
            />
          )}
        />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <Controller
          name="author"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
              label="Author"
              {...field}
              error={!!errors.author}
              helperText={errors.author?.message as string}
              variant="outlined"
            />
          )}
        />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
        <Controller
          name="year"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
              type="number"
              label="Year"
              {...field}
              error={!!errors.year}
              helperText={errors.year?.message as string}
              variant="outlined"
            />
          )}
        />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(16.66% - 16px)' } }}>
        <Controller
          name="quantity"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              {...field}
              error={!!errors.quantity}
              helperText={errors.quantity?.message as string}
              variant="outlined"
            />
          )}
        />
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Autocomplete
              options={categories}
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
              {...field}
              onChange={(_, data) => field.onChange(data)}
              value={field.value || null}
            />
          )}
        />
        {errors.category && <Typography color="error">{errors.category.message as string}</Typography>}
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <Controller
          name="isAvailable"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Available"
            />
          )}
        />
        {errors.isAvailable && <Typography color="error">{errors.isAvailable.message as string}</Typography>}
      </Box>
      <Box sx={{ flex: { xs: '100%', sm: '0 0 calc(25% - 16px)' } }}>
        <Controller
          name="bookCondition"
          control={control}
          defaultValue="new"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel value="used" control={<Radio />} label="Used" />
            </RadioGroup>
          )}
        />
        {errors.bookCondition && <Typography color="error">{errors.bookCondition.message as string}</Typography>}
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