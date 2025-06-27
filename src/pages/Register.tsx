import { Box, Button, Typography } from '@mui/material';
import CustomForm from '../components/CustomForm';
import CustomTextField from '../components/inputs/CustomTextField';
import { useRegisterForm } from '../hooks/useRegisterForm';
import SnackbarComponent from '../components/Snackbar';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { handleSubmit, snackbarProps, registerSchema, formMethods } = useRegisterForm(); 
  const navigate = useNavigate();

  const onSubmit = async () => {
    await handleSubmit();
  };

  const handleBackClick = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, backgroundColor: 'background.paper', borderRadius: 8 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        Register
      </Typography>
      <CustomForm
        onSubmit={onSubmit}
        defaultValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={registerSchema}
        formMethods={formMethods}
      >
        <CustomTextField name="email" label="Email" type="email" sx={{ mb: 2 }} />
        <CustomTextField name="password" label="Password" type="password" sx={{ mb: 2 }} />
        <CustomTextField name="confirmPassword" label="Confirm Password" type="password" sx={{ mb: 2 }} />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.5, backgroundColor: '#1976d2', color: 'white', borderRadius: 8 }}
        >
          REGISTER
        </Button>
      </CustomForm>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBackClick}
          sx={{ borderRadius: 8, padding: '6px 16px' }}
        >
          BACK
        </Button>
      </Box>
      <SnackbarComponent {...snackbarProps} />
    </Box>
  );
};

export default Register;
