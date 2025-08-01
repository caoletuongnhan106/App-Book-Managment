import {
  Box,
  Typography,
  Grid,
  useTheme,
  Paper
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { useBookContext } from '../../context/BookContext';
import { useUserContext } from '../../context/UserContext';
import { useLoanManagement } from '../../hooks/useLoanManagement';
import { useEffect } from 'react';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { books } = useBookContext();
  const { users } = useUserContext();
  const { loans, fetchLoans } = useLoanManagement({ isAdmin: true });

  useEffect(() => {
    fetchLoans();
  }, []);

  const numBooks = books.length;
  const numUsers = users.length;
  const numLoans = loans.length;
  const numReturned = loans.filter((l) => l.returnDate).length;
  const numUnreturned = numLoans - numReturned;

  const pieData = [
    { name: 'Đã trả', value: numReturned },
    { name: 'Chưa trả', value: numUnreturned },
  ];

  const COLORS = [theme.palette.success.main, theme.palette.error.main];

  const barData = [
    { name: 'Sách', value: numBooks },
    { name: 'Người dùng', value: numUsers },
    { name: 'Lượt mượn', value: numLoans },
  ];

  const StyledCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        borderLeft: `6px solid ${color}`,
        backgroundColor: '#ffffff',
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold" color="primary" mt={1}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        mb={4}
      >
        Thống kê quản trị thư viện
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs:12, md:4}}>
          <StyledCard title="Tổng số sách" value={numBooks} color="#1976d2" />
        </Grid>
        <Grid size={{ xs:12, md:4}}>
          <StyledCard title="Tổng người dùng" value={numUsers} color="#388e3c" />
        </Grid>
        <Grid size={{ xs:12, md:4}}>
          <StyledCard title="Tổng lượt mượn" value={numLoans} color="#f57c00" />
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={1}>
        <Grid size={{ xs:12, md:6}}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2} color="secondary">
              Biểu đồ số lượng
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={theme.palette.primary.main} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs:12, md:6}}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2} color="secondary">
              Tình trạng mượn sách
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
