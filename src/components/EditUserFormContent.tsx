import { Box, Grid, Stack } from '@mui/material';
import CustomForm from './CustomForm';
import CustomTextField from './inputs/CustomTextField';
import CustomRadioGroup from './inputs/CustomRadioGroup';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useUserContext, type User } from '../context/UserContext';
import { useMutation } from '@tanstack/react-query';
import { editUserApi } from '../api/mockApi';
import * as yup from 'yup';

interface Props {
  user: User;
  onClose: () => void;
}

const roles = [
  { value: 'USER', label: 'User' },
  { value: 'ADMIN', label: 'Admin' },
];

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  role: yup.string().oneOf(['USER', 'ADMIN']).required('Role is required'),
});

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)',
  },
}));

const EditUserFormContent: React.FC<Props> = ({ user, onClose }) => {
  const { editUser } = useUserContext();

  const mutation = useMutation({
    mutationFn: (updatedUser: User) => editUserApi(updatedUser),
    onSuccess: (data) => {
      editUser( data);
      onClose();
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate({
      ...user,
      name: data.name,
      email: data.email,
      role: data.role,
    });
  };

  return (
    <CustomForm
      onSubmit={onSubmit}
      defaultValues={{
        name: user.name,
        email: user.email,
        role: user.role,
      }}
      validationSchema={schema}
    >
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size = {{xs:12, sm:6}} >
            <CustomTextField name="name" label="Name" />
          </Grid>
          <Grid size = {{xs:12, sm:6}}>
            <CustomTextField name="email" label="Email" type="email" />
          </Grid>
          <Grid size = {{xs:12}}>
            <CustomRadioGroup name="role" options={roles} label="Role" />
          </Grid>
        </Grid>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ px: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <StyledButton type="submit">Save</StyledButton>
      </Stack>
    </CustomForm>
  );
};

export default EditUserFormContent;
