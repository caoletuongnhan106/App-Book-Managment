import React from 'react';
import { FormProvider, useForm,type UseFormReturn } from 'react-hook-form';
import { Box, Button } from '@mui/material';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface CustomFormProps {
  onSubmit: (data: AuthFormData) => Promise<void>;
  defaultValues: AuthFormData;
  validationSchema?: any;
  children: React.ReactNode;
  formMethods?: UseFormReturn<AuthFormData>; 
}

const CustomForm: React.FC<CustomFormProps> = ({ onSubmit, defaultValues, validationSchema, children, formMethods }) => {
  const methods = formMethods || useForm<AuthFormData>({ defaultValues, resolver: undefined });

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