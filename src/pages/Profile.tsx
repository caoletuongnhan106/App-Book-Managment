import {
  Box,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Grid,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAvatarUpload } from '../hooks/useAvatarUpload';
import { useProfileForm } from '../hooks/useProfileForm';
import { useRef, useMemo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const StyledContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledOverlay = styled(Box)(({ }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(224, 234, 252, 0.3)',
  zIndex: 0,
}));

const StyledAvatar = styled(Avatar)(({ }) => ({
  width: 120,
  height: 120,
  transition: 'transform 0.3s ease-in-out',
  border: '4px solid #1976d2',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const StyledUploadButton = styled(Button)(({ theme }) => ({
  borderRadius: '6px', // Bo góc mềm mại như Antd
  padding: theme.spacing(1, 4), // Padding cân đối
  textTransform: 'none',
  fontWeight: 500, // Font đậm vừa phải
  height: '32px', // Chiều cao cố định như Antd
  backgroundColor: '#1890ff', // Màu chính của Antd
  color: '#fff',
  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.02)', // Shadow nhẹ
  transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)', // Hiệu ứng mượt mà
  '&:hover': {
    backgroundColor: '#40a9ff', // Màu hover sáng hơn
    boxShadow: '0 4px 6px rgba(24, 144, 255, 0.2)', // Shadow khi hover
    transform: 'translateY(-1px)', // Nhẹ nhàng nâng lên
  },
  '&:active': {
    transform: 'translateY(0)', // Reset khi nhấn
  },
}));

const StyledSaveButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#1976d2',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
  },
}));

const StyledCard = styled(Card)(({ }) => ({
  mt: 4,
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledTextField = styled(TextField)(({ }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    '& fieldset': {
      borderColor: '#1976d2',
    },
    '&:hover fieldset': {
      borderColor: '#1565c0',
    },
  },
}));

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateAvatar, updateUserProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { avatar, handleAvatarChange } = useAvatarUpload(user?.avatar ?? '');
  const {
    name,
    setName,
    birthYear,
    setBirthYear,
    email,
    setEmail,
    handleSave,
  } = useProfileForm(user);
  const { enqueueSnackbar } = useSnackbar();

  const handleUploadClick = useMemo(() => () => {
    fileInputRef.current?.click();
  }, []);

  const handleAvatarChangeWithUpdate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleAvatarChange(event);
      if (avatar) updateAvatar(avatar);
    },
    [handleAvatarChange, avatar, updateAvatar]
  );

  const handleBack = useMemo(() => () => navigate(-1), [navigate]);

  const enhancedHandleSave = async () => {
    const isValid = handleSave();
    if (!isValid) return;

    try {
      await updateUserProfile({ name, birthYear, email });
      enqueueSnackbar('Cập nhật thông tin thành công!', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      enqueueSnackbar('Cập nhật thất bại, vui lòng thử lại.', {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setBirthYear(newDate.getFullYear().toString());
    } else {
      setBirthYear('');
    }
  };

  return (
    <StyledContainer>
      <StyledOverlay />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{ mb: 2, borderRadius: '20px', color: '#1976d2', borderColor: '#1976d2', '&:hover': { borderColor: '#1565c0' } }}
        >
          Back
        </Button>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center', mb: 3 }}
        >
          Thông tin cá nhân
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid size = {{xs:12, md:4}} sx={{ textAlign: 'center' }}>
              <StyledAvatar src={avatar || undefined} alt="Avatar" />
              <StyledUploadButton variant="contained" onClick={handleUploadClick} sx={{ mt: 2 }}>
                Tải lên avatar
              </StyledUploadButton>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleAvatarChangeWithUpdate}
              />
            </Grid>
            <Grid size = {{xs:12, md:6}}>
              <StyledTextField
                label="Họ tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <DateTimePicker
                label="Năm sinh"
                value={birthYear ? new Date(parseInt(birthYear), 0, 1) : null}
                onChange={handleDateChange}
                views={['year']}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    fullWidth: true,
                    sx: { mb: 2 },
                  },
                }}
                maxDate={new Date()}
              />
              <StyledTextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <StyledSaveButton variant="contained" color="primary" onClick={enhancedHandleSave} sx={{ mt: 2 }}>
                Lưu thông tin
              </StyledSaveButton>
            </Grid>
          </Grid>
        </LocalizationProvider>

        <StyledCard>
          <CardContent>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Thông tin tài khoản
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Email: <strong>{user?.email}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              ID: <strong>{user?.id}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Vai trò: <strong>{user?.role}</strong>
            </Typography>
          </CardContent>
        </StyledCard>
      </Box>
    </StyledContainer>
  );
};

export default Profile;