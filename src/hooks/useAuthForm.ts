import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from './useSnackbar';
import { useForm,type UseFormReturn } from 'react-hook-form';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface UseAuthFormReturn {
  formMethods: UseFormReturn<AuthFormData>;
  handleSubmit: (isRegister: boolean) => Promise<void>;
  snackbarProps: ReturnType<typeof useSnackbar>['snackbarProps'];
}

export const useAuthForm = (initialPath: string = '/login'): UseAuthFormReturn => {
  const { login, register } = useAuth();
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
    baseSchema.shape({
      confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    [baseSchema]
  );

  const formMethods = useForm<AuthFormData>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
    resolver: (values) => {
      const schema = initialPath === '/register' ? registerSchema : baseSchema;
      return schema.validate(values, { abortEarly: false }).then(() => ({ values, errors: {} })).catch((err) => ({
        values: {},
        errors: err.inner.reduce((acc: any, e: yup.ValidationError) => ({
            ...acc,
            [e.path!]: { type: e.type ?? 'validation', message: e.message }
          }), {}),
          
      }));
    },
  });

  const handleSubmit = useCallback(
    async (isRegister: boolean) => {
      formMethods.formState.isSubmitted && formMethods.reset();
      formMethods.clearErrors();
      await formMethods.trigger();
      const isValid = await formMethods.trigger();

      if (isValid) {
        const data = formMethods.getValues();
        const cleanedData = {
          email: data.email.trim(),
          password: data.password.trim(),
          confirmPassword: data.confirmPassword?.trim(),
        };
        console.log('Cleaned form data submitted:', cleanedData);
        const authFunction = isRegister ? register : login;
        const result = await authFunction(cleanedData.email, cleanedData.password);

        if (result.success) {
          showMessage(`${isRegister ? 'Đăng ký' : 'Đăng nhập'} thành công!`, 'success');
          console.log('Navigating to:', initialPath === '/register' ? '/login' : '/');
          navigate(initialPath === '/register' ? '/login' : '/');
        } else {
          showMessage(result.error || `${isRegister ? 'Đăng ký' : 'Đăng nhập'} không thành công!`, 'error');
        }
      } else {
        console.log('Form validation failed:', formMethods.formState.errors);
      }
    },
    [formMethods, registerSchema, baseSchema, register, login, showMessage, navigate, initialPath]
  );

  return { formMethods, handleSubmit, snackbarProps };
};