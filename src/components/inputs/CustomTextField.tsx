import { Controller } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'onBlur'> {
  name: string;
  label: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ name, label, type = 'text', onChange: propOnChange, onBlur: propOnBlur, ...rest }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
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
          error={!!fieldState.error}
          helperText={fieldState.error?.message || ''}
          variant="outlined"
          {...rest}
        />
      )}
    />
  );
};

export default CustomTextField;