import { Box, Button, Typography } from '@mui/material';
import CustomForm from '../components/CustomForm';
import CustomTextField from '../components/inputs/CustomTextField';
import { useLoginForm } from '../hooks/useLoginForm';
import SnackbarComponent from '../components/Snackbar';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { handleSubmit, snackbarProps, loginSchema, formMethods } = useLoginForm();
  const navigate = useNavigate();

  const onSubmit = async () => {
    await handleSubmit();
  };

  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, backgroundColor: 'background.paper', borderRadius: 8 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Login
      </Typography>

      <CustomForm
        onSubmit={onSubmit}
        defaultValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        formMethods={formMethods}
      >
        <CustomTextField name="email" label="Email" type="email" sx={{ mb: 2 }} />
        <CustomTextField name="password" label="Password" type="password" sx={{ mb: 2 }} />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.5, backgroundColor: '#1976d2', color: 'white', borderRadius: 8 }}
        >
          LOGIN
        </Button>

        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={handleRegisterClick}
          sx={{ mt: 2, py: 1.5, borderRadius: 8 }}
        >
          REGISTER
        </Button>
      </CustomForm>

      <SnackbarComponent {...snackbarProps} />
    </Box>
  );
};

export default Login;
