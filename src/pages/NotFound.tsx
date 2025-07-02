import { Typography } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Typography variant="h4" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
      404 - Page Not Found
    </Typography>
  );
};

export default NotFound;