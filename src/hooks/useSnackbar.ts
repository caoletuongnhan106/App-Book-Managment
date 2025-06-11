import { useState } from 'react';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  const showMessage = (newMessage: string, newSeverity: 'success' | 'error') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, message, severity, showMessage, handleClose };
};