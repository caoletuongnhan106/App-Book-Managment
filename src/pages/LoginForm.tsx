import { Box, Typography, Button, useTheme } from '@mui/material';
import CustomForm from '../components/CustomForm';
import CustomTextField from '../components/inputs/CustomTextField';
import { useLoginForm } from '../hooks/useLoginForm';
import SnackbarComponent from '../components/Snackbar';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledFormWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: 420,
  width: '100%',
  backgroundColor: 'rgba(255,255,255,0.95)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 12px ${theme.palette.primary.light}`,
  },
}));

const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleSubmit, snackbarProps, loginSchema, formMethods } = useLoginForm();

  const onSubmit = async () => {
    await handleSubmit();
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <StyledContainer>
      <StyledFormWrapper>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: theme.palette.primary.main }}
        >
          Đăng nhập
        </Typography>

        <CustomForm
          onSubmit={onSubmit}
          defaultValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          formMethods={formMethods}
        >
          <CustomTextField name="email" label="Email" type="email" sx={{ mb: 2 }} />
          <CustomTextField name="password" label="Mật khẩu" type="password" sx={{ mb: 2 }} />

          <StyledButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: '#fff',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Đăng nhập
          </StyledButton>

          <StyledButton
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleRegisterClick}
            sx={{
              mt: 2,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                color: theme.palette.primary.dark,
              },
            }}
          >
            Đăng ký tài khoản
          </StyledButton>
        </CustomForm>

        <SnackbarComponent {...snackbarProps} />
      </StyledFormWrapper>
    </StyledContainer>
  );
};

export default Login;
