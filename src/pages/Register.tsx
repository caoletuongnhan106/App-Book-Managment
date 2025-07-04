import { Box, Typography, Button } from '@mui/material';
import CustomForm from '../components/CustomForm';
import CustomTextField from '../components/inputs/CustomTextField';
import { useRegisterForm } from '../hooks/useRegisterForm';
import SnackbarComponent from '../components/Snackbar';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  position: 'relative',
  overflow: 'hidden',
}));

const StyledOverlay = styled(Box)(({ }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(236, 239, 241, 0.3)',
  zIndex: 0,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)',
  },
}));

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
    <StyledContainer>
      <StyledOverlay />
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 400, mx: 'auto', mt: 5, p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 8 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}
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
          <StyledButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.5, backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}
          >
            REGISTER
          </StyledButton>
        </CustomForm>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <StyledButton
            variant="outlined"
            onClick={handleBackClick}
            sx={{ py: 1.5, color: '#1976d2', borderColor: '#1976d2', '&:hover': { borderColor: '#1565c0', color: '#1565c0' } }}
          >
            BACK
          </StyledButton>
        </Box>
        <SnackbarComponent {...snackbarProps} />
      </Box>
    </StyledContainer>
  );
};

export default Register;