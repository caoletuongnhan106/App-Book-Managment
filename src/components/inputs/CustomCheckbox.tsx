import { Controller } from 'react-hook-form';
import { FormControlLabel, Checkbox, FormHelperText } from '@mui/material';

interface CustomCheckboxProps {
  name: string;
  label: string;
  onChange?: (checked: boolean) => void;
  onBlur?: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ name, label, onChange: propOnChange, onBlur: propOnBlur }) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    if (propOnChange) propOnChange(e.target.checked);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    if (propOnBlur) propOnBlur();
                  }}
                />
              }
              label={label}
            />
            {fieldState.error && <FormHelperText error>{fieldState.error?.message}</FormHelperText>}
          </>
        )}
      />
    </>
  );
};

export default CustomCheckbox;