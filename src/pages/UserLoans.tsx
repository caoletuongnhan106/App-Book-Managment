import { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import CustomTable from '../components/CustomTable';
import { useNavigate } from 'react-router-dom';
import { useLoanManagement } from '../hooks/useLoanManagement';

const UserLoans: React.FC = () => {
  const { loans, handleReturn, loading, fetchLoans } = useLoanManagement();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

const handleBack = () => {
  navigate(-1); 
};


  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'bookTitle', label: 'Tên sách' },
    { id: 'loanDate', label: 'Ngày mượn' },
    { id: 'returnDate', label: 'Ngày trả' },
    {
      id: 'status',
      label: 'Trạng thái',
      render: (_: any, row: any) =>
        row.returnDate ? (
          <span style={{ color: 'gray' }}>Đã trả</span>
        ) : (
          <span style={{ color: 'green', fontWeight: 'bold' }}>Đang mượn</span>
        ),
    },
    {
      id: 'action',
      label: 'Hành động',
      render: (_: any, row: any) =>
        row.returnDate ? (
          <Typography variant="body2" color="textSecondary">Đã trả</Typography>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleReturn(row.id)}
          >
            Trả sách
          </Button>
        ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>BACK</Button>
      <Typography variant="h6" gutterBottom>
        Quản lý mượn/trả sách
      </Typography>
      <CustomTable
        columns={columns}
        data={loans}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(newPage) => setPage(newPage)}
        onRowsPerPageChange={(newRows) => setRowsPerPage(newRows)}
        loading={loading}
      />
    </Box>
  );
};

export default UserLoans;
