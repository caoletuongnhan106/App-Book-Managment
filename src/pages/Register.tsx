import { Box, Button, Typography } from '@mui/material';
import CustomForm from '../components/CustomForm';
import CustomTextField from '../components/inputs/CustomTextField';
import { useRegisterForm } from '../hooks/useRegisterForm';
import SnackbarComponent from '../components/Snackbar';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { handleSubmit, snackbarProps } = useRegisterForm();
  const { control } = useFormContext(); 
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, backgroundColor: 'background.paper', borderRadius: 8 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Register
      </Typography>
      <CustomForm
        onSubmit={async () => await handleSubmit()}
        defaultValues={{ email: '', password: '', confirmPassword: '' }}
      >
        <CustomTextField name="email" label="Email" type="email" control={control} sx={{ mb: 2 }} />
        <CustomTextField name="password" label="Password" type="password" control={control} sx={{ mb: 2 }} />
        <CustomTextField name="confirmPassword" label="Confirm Password" type="password" control={control} sx={{ mb: 2 }} />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: '#1976d2',
            color: 'white',
            borderRadius: 8,
            '&:hover': {
              backgroundColor: '#1565c0',
              transform: 'scale(1.02)',
              transition: 'all 0.3s',
            },
          }}
        >
          Register
        </Button>
      </CustomForm>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/login')}
          sx={{
            borderRadius: 8,
            padding: '6px 16px',
            '&:hover': {
              backgroundColor: '#e3f2fd',
              borderColor: '#1976d2',
            },
          }}
        >
          Quay lại
        </Button>
      </Box>
      <SnackbarComponent {...snackbarProps} />
    </Box>
  );
};

export default Register;