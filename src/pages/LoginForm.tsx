import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import CustomForm from '../components/CustomForm';
import CustomTextField from '../components/inputs/CustomTextField';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useSnackbar } from '../hooks/useSnackbar';

interface LoginResult {
  success: boolean;
  user?: { email: string; role: 'admin' | 'user' };
  error?: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
}).required();

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { open, message, severity, showMessage, handleClose } = useSnackbar();

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      showMessage('Đăng nhập thành công!', 'success');
      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập không thành công!';
      showMessage(errorMessage, 'error');
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;