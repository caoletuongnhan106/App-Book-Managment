import { Box, Button, Typography } from '@mui/material';
import CustomForm from './CustomForm';
import CustomTextField from './inputs/CustomTextField';
import { useAuth } from '../context/AuthContext';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
}).required();

const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, backgroundColor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <CustomForm
        onSubmit={onSubmit}
        defaultValues={{ email: '', password: '' }}
        validationSchema={schema}
      >
        <CustomTextField name="email" label="Email" type="email" />
        <CustomTextField name="password" label="Password" type="password" sx={{ mt: 2 }} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Login
        </Button>
      </CustomForm>
    </Box>
  );
};

export default LoginForm;