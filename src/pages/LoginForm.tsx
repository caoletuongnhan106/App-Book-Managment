import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import CustomForm from '../components/CustomForm';
import CustomTextField from '../components/inputs/CustomTextField';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useState } from 'react';

interface LoginResult {
  success: boolean;
  user?: { email: string; role: string };
  error?: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
}).required();

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSubmit = async (data: any) => {
    try {
      const result: LoginResult = await login(data.email, data.password);
      if (result.success) {
        setSnackbarMessage('Đăng nhập thành công!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        navigate('/');
      } else {
        setSnackbarMessage(result.error || 'Đăng nhập không thành công!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('Đã xảy ra lỗi khi đăng nhập!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
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
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;