import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from './useSnackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface UseRegisterFormReturn {
  handleSubmit: () => Promise<void>;
  snackbarProps: ReturnType<typeof useSnackbar>['snackbarProps'];
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { showMessage, snackbarProps } = useSnackbar();

  const registerSchema = useMemo(() =>
    yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    []
  );

  const formMethods = useForm<RegisterFormData>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
    resolver: yupResolver(registerSchema),
  });

  const handleSubmit = useCallback(async () => {
    const isValid = await formMethods.trigger();

    if (isValid) {
      const data = formMethods.getValues();
      const cleanedData = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      const result = await register(cleanedData.email, cleanedData.password);

      if (result.success) {
        showMessage('Đăng ký thành công!', 'success');
        navigate('/login');
      } else {
        showMessage(result.error || 'Đăng ký không thành công!', 'error');
      }
    }
  }, [formMethods, register, showMessage, navigate]);

  return { handleSubmit, snackbarProps };
};
