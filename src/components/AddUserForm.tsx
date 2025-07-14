import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { useUserContext } from '../context/UserContext';

interface AddUserFormProps {
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onClose }) => {
  const { addUser } = useUserContext();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    addUser({ id: Date.now(), ...data });
    reset();
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register('name')} label="Name" fullWidth margin="normal" required />
      <TextField {...register('email')} label="Email" fullWidth margin="normal" required />
      <Button type="submit" variant="contained">Add</Button>
    </Box>
  );
};

export default AddUserForm;
