import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';

export const useProfileForm = (initialUser: { name?: string; birthYear?: string; email: string } | null) => {
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState(initialUser?.name ?? '');
  const [birthYear, setBirthYear] = useState(initialUser?.birthYear ?? '');
  const [email, setEmail] = useState(initialUser?.email ?? '');

  useEffect(() => {
    if (initialUser) {
      setName(initialUser.name ?? '');
      setBirthYear(initialUser.birthYear ?? '');
      setEmail(initialUser.email);
    }
  }, [initialUser]);

  const validateEmail = useCallback((email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const validateBirthYear = useCallback((year: string): boolean => {
    const num = parseInt(year);
    const currentYear = new Date().getFullYear();
    return !isNaN(num) && num >= 1900 && num <= currentYear;
  }, []);

  const handleSave = useCallback(() => {
    if (!name.trim()) {
      enqueueSnackbar('Họ tên không được để trống', {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      return false;
    }

    if (!validateBirthYear(birthYear)) {
      enqueueSnackbar('Năm sinh không hợp lệ (1900 - hiện tại)', {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      return false;
    }

    if (!validateEmail(email)) {
      enqueueSnackbar('Email không hợp lệ', {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      return false;
    }

    enqueueSnackbar('Cập nhật thông tin thành công!', {
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    });
    return true;
  }, [name, birthYear, email, validateBirthYear, validateEmail, enqueueSnackbar]);

  return {
    name,
    setName,
    birthYear,
    setBirthYear,
    email,
    setEmail,
    handleSave,
    validateEmail,
    validateBirthYear,
  };
};