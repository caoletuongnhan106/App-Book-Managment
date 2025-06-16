import { Box, Button, Typography } from '@mui/material';
import CustomForm from '../components/CustomForm';
import CustomTextField from '../components/inputs/CustomTextField';
import { useLoginForm } from '../hooks/useLoginForm';
import SnackbarComponent from '../components/Snackbar';

const Login: React.FC = () => {
  const { formMethods, handleSubmit, snackbarProps } = useLoginForm();

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, backgroundColor: 'background.paper', borderRadius: 8 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Login
      </Typography>
      <CustomForm
        onSubmit={async () => await handleSubmit()}
        defaultValues={{ email: '', password: '' }}
        formMethods={formMethods}
      >
        <CustomTextField name="email" label="Email" type="email" sx={{ mb: 2 }} />
        <CustomTextField name="password" label="Password" type="password" sx={{ mb: 2 }} />
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
          Login
        </Button>
      </CustomForm>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="primary"
          href="/register" 
          sx={{
            borderRadius: 8,
            padding: '6px 16px',
            '&:hover': {
              backgroundColor: '#e3f2fd',
              borderColor: '#1976d2',
            },
          }}
        >
          Đăng ký
        </Button>
      </Box>
      <SnackbarComponent {...snackbarProps} />
    </Box>
  );
};

export default Login;