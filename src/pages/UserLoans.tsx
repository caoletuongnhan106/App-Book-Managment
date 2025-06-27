import { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import CustomTable from '../components/CustomTable';
import { useLoanManagement } from '../hooks/useLoanManagement';

const UserLoans: React.FC = () => {
  const { loans, handleReturn, loading, fetchLoans } = useLoanManagement();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    <div>
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
    </div>
  );
};

export default UserLoans;
