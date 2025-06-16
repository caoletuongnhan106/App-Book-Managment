import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from './useSnackbar';
import { useForm,type UseFormReturn } from 'react-hook-form';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthResult {
  success: boolean;
  user?: { id: string; email: string; role: string };
  error?: string;
}

interface UseRegisterFormReturn {
  formMethods: UseFormReturn<RegisterFormData>;
  handleSubmit: () => Promise<void>;
  snackbarProps: ReturnType<typeof useSnackbar>['snackbarProps'];
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { showMessage, snackbarProps } = useSnackbar();

  const baseSchema = useMemo(() =>
    yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    }),
    []
  );

  const registerSchema = useMemo(() =>
    yup.object({
      ...baseSchema.fields,
      confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    [baseSchema]
  );

  const formMethods = useForm<RegisterFormData>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
    resolver: async (values) =>
        registerSchema.validate(values, { abortEarly: false })
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
        confirmPassword: data.confirmPassword.trim(),
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

  return { formMethods, handleSubmit, snackbarProps };
};