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
import { useUserContext } from '../../context/UserContext.tsx';
import type { UserInList } from '../../types';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Paper)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'box-shadow 0.3s ease',
  backgroundColor: '#fff',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const ManageUsers: React.FC = () => {
  const { users, deleteUser } = useUserContext();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInList | null>(null);

  const handleEdit = (user: UserInList) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleCloseAdd = () => setAddOpen(false);
  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        mb={4}
      >
        Quản lý người dùng
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
          sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 'bold' }}
        >
          Thêm người dùng
        </Button>
      </Box>

      <Box>
        {users.length === 0 ? (
          <Typography textAlign="center" color="textSecondary">
            Chưa có người dùng nào.
          </Typography>
        ) : (
          users.map((user) => (
            <StyledCard key={user.id}>
              <Box>
                <Typography fontWeight="bold" color="primary">
                  {user.name}
                </Typography>
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
            </StyledCard>
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
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  width: { xs: '90%', sm: 500 },
};

export default ManageUsers;
