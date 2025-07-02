import React from 'react';
import {
  FormProvider,
  useForm,
  type UseFormProps,
  type UseFormReturn,
  type SubmitHandler,
  type FieldValues,
} from 'react-hook-form';
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

interface CustomFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues: UseFormProps<T>['defaultValues'];
  validationSchema?: any; 
  formMethods?: UseFormReturn<T>;
  children: React.ReactNode;
}

const CustomForm = <T extends FieldValues>({
  onSubmit,
  defaultValues,
  validationSchema,
  formMethods,
  children,
}: CustomFormProps<T>) => {
  const methods = formMethods || useForm<T>({
    defaultValues,
    resolver: validationSchema ? yupResolver(validationSchema) as any : undefined, 
    mode: 'onChange',
  });

  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {children}
      </Box>
    </FormProvider>
  );
};

export default CustomForm;