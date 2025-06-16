import React from 'react';
import {FormProvider, useForm, type UseFormReturn, type DefaultValues,
} from 'react-hook-form';
import { Box } from '@mui/material';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface CustomFormProps<T extends Record<string, any> = FormData> {
  onSubmit: (data: T) => Promise<void>;
  defaultValues: DefaultValues<T>;
  validationSchema?: any;
  children: React.ReactNode;
  formMethods?: UseFormReturn<T>;
}

const CustomForm = <T extends Record<string, any> = FormData>({
  onSubmit,
  defaultValues,
  validationSchema,
  children,
  formMethods,
}: CustomFormProps<T>) => {
  const methods = formMethods || useForm<T>({ defaultValues, resolver: validationSchema });

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
