import React from 'react';
import { FormProvider, useForm,type UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string; 
}

interface CustomFormProps<T extends Record<string, any> = FormData> {
  onSubmit: (data: T) => Promise<void>;
  defaultValues: UseFormReturn<T>['formState']['defaultValues']; 
  validationSchema?: any;
  children: React.ReactNode;
}

const CustomForm = <T extends Record<string, any> = FormData>({
  onSubmit,
  defaultValues,
  validationSchema,
  children,
}: CustomFormProps<T>) => {
  const methods = useForm<T>({ 
    defaultValues : defaultValues as any, 
    resolver: validationSchema });

  const handleSubmitWrapper = methods.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmitWrapper} noValidate>
        {children}
      </Box>
    </FormProvider>
  );
};

export default CustomForm;