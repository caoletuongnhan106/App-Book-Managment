import { useState, useCallback, useMemo } from 'react';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  const showMessage = useCallback((newMessage: string, newSeverity: 'success' | 'error') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const snackbarProps = useMemo(() => ({
    open,
    message,
    severity,
    onClose: handleClose,
  }), [open, message, severity, handleClose]);

  return { showMessage, handleClose, snackbarProps };
};