import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  Card,
  CardContent,
  Grid,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAvatarUpload } from '../hooks/useAvatarUpload';
import { useProfileForm } from '../hooks/useProfileForm';
import { useRef, useMemo, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledOverlay = styled(Box)(({  }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(224, 234, 252, 0.3)',
  zIndex: 0,
}));

const StyledAvatar = styled(Avatar)(({  }) => ({
  width: 120,
  height: 120,
  transition: 'transform 0.3s ease-in-out',
  border: '4px solid #1976d2',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
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

const StyledCard = styled(Card)(({  }) => ({
  mt: 4,
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledTextField = styled(TextField)(({  }) => ({
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
  const [message, setMessage] = useState<string | null>(null);

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
    try {
      await handleSave(); 
      await updateUserProfile({ name, birthYear, email }); 
      setMessage('Cập nhật thông tin thành công!');
      setTimeout(() => setMessage(null), 3000); 
    } catch (error) {
      setMessage('Cập nhật thất bại, vui lòng thử lại.');
      setTimeout(() => setMessage(null), 3000);
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

        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid size = {{ xs:12, md:4}} sx={{ textAlign: 'center' }}>
            <StyledAvatar src={avatar || undefined} alt="Avatar" />
            <StyledButton variant="contained" onClick={handleUploadClick} sx={{ mt: 2 }}>
              Tải lên avatar
            </StyledButton>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleAvatarChangeWithUpdate}
            />
          </Grid>
          <Grid size = {{ xs:12, md:6}}>
            <StyledTextField
              label="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <StyledTextField
              label="Năm sinh"
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <StyledTextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <StyledButton variant="contained" color="primary" onClick={enhancedHandleSave} sx={{ mt: 2 }}>
              Lưu thông tin
            </StyledButton>
            {message && (
              <Alert severity={message.includes('thành công') ? 'success' : 'error'} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </Grid>
        </Grid>

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