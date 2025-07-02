import { Controller, useFormContext } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'onBlur' | 'value'> {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  type = 'text',
  onChange: propOnChange,
  onBlur: propOnBlur,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: true }} 
      render={({ field, fieldState }) => {
        console.log(`Field ${name} value:`, field.value); 
        console.log(`Field ${name} state:`, fieldState); 
        return (
          <TextField
            fullWidth
            label={label}
            type={type}
            value={field.value ?? ''} 
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value); 
              if (propOnChange) propOnChange(e);
            }}
            onBlur={(e) => {
              field.onBlur();
              if (propOnBlur) propOnBlur(e);
            }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message || ''}
            variant="outlined"
            {...rest}
          />
        );
      }}
    />
  );
};

export default CustomTextField;