import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormProps {
  onSubmit: (data: any, methods: UseFormReturn<any>) => void;
  children: ReactNode;
  defaultValues?: Record<string, any>;
  validationSchema?: yup.AnyObjectSchema;
}

const Form: React.FC<FormProps> = ({ onSubmit, children, defaultValues = {}, validationSchema = yup.object({}) }) => {
  const methods: UseFormReturn<any> = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const handleSubmit = (data: any) => {
    onSubmit(data, methods);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;