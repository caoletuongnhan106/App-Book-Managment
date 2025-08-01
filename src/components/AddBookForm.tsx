import { Box, Grid, Stack, Button, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { useBookContext } from '../context/BookContext';
import CustomForm from './CustomForm';
import CustomTextField from './inputs/CustomTextField';
import CustomAutocomplete from './inputs/CustomAutocomplete';
import CustomCheckbox from './inputs/CustomCheckbox';
import CustomRadioGroup from './inputs/CustomRadioGroup';
import UploadFile from './inputs/UploadFile';

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
  image: yup
    .mixed()
    .test('fileRequired', 'Image is required', (value) => value instanceof File),
  description: yup.string().required('Description is required'),
});

const categories = ['Fiction', 'Non-Fiction', 'Science', 'History'];
const bookConditions = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
];

interface AddBookFormProps {
  onClose: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onClose }) => {
  const { addBook } = useBookContext();

  const onSubmit = async (data: any, methods: any) => {
    const formData = new FormData();
    formData.append('id', uuidv4());
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('year', data.year.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('category', data.category);
    formData.append('isAvailable', String(data.isAvailable));
    formData.append('bookCondition', data.bookCondition);
    formData.append('description', data.description); 
    formData.append('createdAt', new Date().toISOString());

    if (data.image && data.image instanceof File) {
      formData.append('image', data.image);
    }

    addBook(formData);
    methods.reset();
    onClose();
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
          description: '',
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
          <Grid size = {{xs:12, sm:4}}>
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
          <Grid size = {{xs:12}}>
            <CustomTextField name="description" label="Description" multiline minRows={3} fullWidth/>
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
