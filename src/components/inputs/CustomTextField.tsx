import { Controller, useFormContext } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'onBlur'> {
  name: string;
  label: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ name, label, type = 'text', onChange: propOnChange, onBlur: propOnBlur, ...rest }) => {
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
          onChange={(e) => {
            field.onChange(e);
            if (propOnChange) propOnChange(e.target.value);
          }}
          onBlur={(e) => {
            field.onBlur();
            if (propOnBlur) propOnBlur(e.target.value);
          }}
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ''}
          variant="outlined"
          {...rest}
        />
      )}
    />
  );
};

export default CustomTextField;