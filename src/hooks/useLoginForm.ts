import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from './useSnackbar';
import { useForm,type UseFormReturn } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  user?: { id: string; email: string; role: string };
  error?: string;
}

interface UseLoginFormReturn {
  formMethods: UseFormReturn<LoginFormData>;
  handleSubmit: () => Promise<void>;
  snackbarProps: ReturnType<typeof useSnackbar>['snackbarProps'];
}

export const useLoginForm = (): UseLoginFormReturn => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showMessage, snackbarProps } = useSnackbar();

  const loginSchema = useMemo(() =>
    yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    }),
    []
  );

  const formMethods = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
    resolver: async (values) =>
      loginSchema.validate(values, { abortEarly: false })
        .then(() => ({ values, errors: {} }))
        .catch((err: yup.ValidationError) => ({
          values: {},
          errors: err.inner.reduce<Record<string, any>>((acc, e: yup.ValidationError) => ({
            ...acc,
            [e.path!]: { type: e.type ?? 'validation', message: e.message }
          }), {})
        })),
    
  });

  const handleSubmit = useCallback(async () => {
    formMethods.clearErrors();
    await formMethods.trigger();
    const isValid = await formMethods.trigger();

    if (isValid) {
      const data = formMethods.getValues();
      const cleanedData = {
        email: data.email.trim(),
        password: data.password.trim(),
      };
      const result = await login(cleanedData.email, cleanedData.password);

      if (result.success) {
        showMessage('Đăng nhập thành công!', 'success');
        navigate('/');
      } else {
        showMessage(result.error || 'Đăng nhập không thành công!', 'error');
      }
    }
  }, [formMethods, login, showMessage, navigate]);

  return { formMethods, handleSubmit, snackbarProps };
};