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
  registerSchema: yup.ObjectSchema<RegisterFormData>;
  formMethods: ReturnType<typeof useForm<RegisterFormData>>;
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const { showMessage, snackbarProps } = useSnackbar();

  const registerSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email('Email không đúng định dạng')
          .required('Email là bắt buộc')
          .test('is-valid-domain', 'Tên miền email không hợp lệ', (value) => {
            if (!value) return false;
            const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
            const domain = value.split('@')[1];
            return validDomains.includes(domain);
          }),
        password: yup.string().required('Mật khẩu là bắt buộc').min(6, 'Tối thiểu 6 ký tự'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
          .required('Xác nhận mật khẩu là bắt buộc'),
      }),
    []
  );
  
  const formMethods = useForm<RegisterFormData>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const handleSubmit = useCallback(async () => {
    const isValid = await formMethods.trigger();
    if (isValid) {
      const data = formMethods.getValues();
      const result = await authRegister(data.email, data.password);
      if (result.success) {
        showMessage('Đăng ký thành công!', 'success');
        navigate('/login');
      } else {
        showMessage(result.error || 'Đăng ký thất bại!', 'error');
      }
    } else {
      showMessage('Vui lòng kiểm tra lại các trường nhập liệu!', 'error');
    }
  }, [formMethods, authRegister, showMessage, navigate]);

  return { handleSubmit, snackbarProps, registerSchema, formMethods };
};
