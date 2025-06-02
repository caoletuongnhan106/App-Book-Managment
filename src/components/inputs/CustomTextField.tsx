import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface CustomTextFieldProps {
  name: string;
  label: string;
  type?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ name, label, type = 'text' }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          fullWidth
          label={label}
          type={type}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ''}
          variant="outlined"
        />
      )}
    />
  );
};

export default CustomTextField;