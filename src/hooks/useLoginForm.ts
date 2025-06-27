import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from './useSnackbar';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginFormData {
  email: string;
  password: string;
}

interface UseLoginFormReturn {
  handleSubmit: () => Promise<void>;
  snackbarProps: ReturnType<typeof useSnackbar>['snackbarProps'];
  formMethods: UseFormReturn<LoginFormData>;
  loginSchema: yup.ObjectSchema<LoginFormData>;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const { showMessage, snackbarProps } = useSnackbar();

  const loginSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email('Invalid email format')
          .required('Email is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters'),
      }),
    []
  );

  const formMethods = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const handleSubmit = useCallback(async () => {
    const isValid = await formMethods.trigger();

    if (isValid) {
      const data = formMethods.getValues();
      try {
        const result = await authLogin(data.email, data.password);
        if (result.success) {
          showMessage('Đăng nhập thành công!', 'success');
          navigate('/');
        } else {
          showMessage(result.error || 'Đăng nhập thất bại!', 'error');
        }
      } catch {
        showMessage('Đã xảy ra lỗi khi đăng nhập!', 'error');
      }
    } else {
      showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
    }
  }, [formMethods, authLogin, showMessage, navigate]);

  return { handleSubmit, snackbarProps, formMethods, loginSchema };
};
