import { Controller } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'onBlur' | 'value'> {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ name, label, type = 'text', onChange: propOnChange, onBlur: propOnBlur, ...rest }) => {
  return (
    <Controller
      name={name}
      defaultValue=""
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          label={label}
          type={type}
          value={field.value} 
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            field.onChange(e.target.value); 
            if (propOnChange) propOnChange(e);
          }}
          onBlur={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            field.onBlur();
            if (propOnBlur) propOnBlur(e);
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