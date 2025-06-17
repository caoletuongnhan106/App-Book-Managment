import { Controller } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'onBlur' | 'value'> {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  transform?: (value: string) => string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  type = 'text',
  onChange: propOnChange,
  onBlur: propOnBlur,
  transform = (value) => value?.trim() || '',
  ...rest
}) => {
  const { control } = useFormContext(); 

  return (
    <Controller
      name={name}
      control={control} 
      defaultValue=""
      render={({ field, fieldState }) => (
        <TextField
          fullWidth
          label={label}
          type={type}
          value={field.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const rawValue = e.target.value;
            const transformedValue = transform(rawValue);
            field.onChange(transformedValue);
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