import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  Stack,
  IconButton,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUserForm from '../../components/AddUserForm.tsx';
import EditUserForm from '../../components/EditUserFormContent.tsx';
import { useUserContext, type User } from '../../context/UserContext.tsx';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const ManageUsers: React.FC = () => {
  const { users, deleteUser } = useUserContext();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleCloseAdd = () => setAddOpen(false);
  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}
      >
        Quản lý người dùng
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setAddOpen(true)}
        sx={{ mb: 3, borderRadius: '10px', textTransform: 'none' }}
      >
        Thêm người dùng
      </Button>

      <Box>
        {users.length === 0 ? (
          <Typography>Chưa có người dùng nào.</Typography>
        ) : (
          users.map((user) => (
            <StyledPaper key={user.id}>
              <Box>
                <Typography fontWeight="bold">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {user.email}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <IconButton onClick={() => handleEdit(user)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteUser(user.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </StyledPaper>
          ))
        )}
      </Box>

      <Modal open={addOpen} onClose={handleCloseAdd}>
        <Box sx={modalStyle}>
          <AddUserForm onClose={handleCloseAdd} />
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={handleCloseEdit}>
        <Box sx={modalStyle}>
          {selectedUser && (
            <EditUserForm user={selectedUser} onClose={handleCloseEdit} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: { xs: '90%', sm: 500 },
};

export default ManageUsers;
