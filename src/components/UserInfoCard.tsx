import { Card, CardContent, Typography, Stack, Avatar } from '@mui/material';
import { Email, Badge, AdminPanelSettings, Person } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface UserInfoProps {
  user: {
    email: string;
    id: string;
    role: string;
    avatar?: string;
  };
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  background: 'linear-gradient(135deg, #ffffff, #f0f4f8)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    margin: theme.spacing(2),
  },
}));

const StyledAvatar = styled(Avatar)(({}) => ({
  width: 100,
  height: 100,
  fontSize: 36,
  border: '4px solid #1976d2',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  '& .MuiTypography-body2': {
    color: '#666',
    fontWeight: 500,
  },
  '& .MuiTypography-body1': {
    color: '#333',
    fontWeight: 600,
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#1976d2',
    },
  },
}));

const UserInfoCard: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <StyledCard elevation={3}>
      <CardContent>
        <StyledStack direction="column" alignItems="center" spacing={3}>
          <StyledAvatar src={user.avatar} alt={user.email}>
            {user.email.charAt(0).toUpperCase()}
          </StyledAvatar>
          <StyledStack spacing={2} width="100%">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Email fontSize="small" color="action" />
              <Typography variant="body2">Email:</Typography>
              <Typography variant="body1" fontWeight={500}>
                {user.email}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Badge fontSize="small" color="action" />
              <Typography variant="body2">ID:</Typography>
              <Typography variant="body1" fontWeight={500}>
                {user.id}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              {user.role === 'admin' ? (
                <AdminPanelSettings fontSize="small" color="action" />
              ) : (
                <Person fontSize="small" color="action" />
              )}
              <Typography variant="body2">Vai trò:</Typography>
              <Typography variant="body1" fontWeight={500}>
                {user.role}
              </Typography>
            </Stack>
          </StyledStack>
        </StyledStack>
      </CardContent>
    </StyledCard>
  );
};

export default UserInfoCard;
