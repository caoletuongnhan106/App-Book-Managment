import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Checkbox, FormHelperText } from '@mui/material';

interface CustomCheckboxProps {
  name: string;
  label: string;
  onChange?: (checked: boolean) => void;
  onBlur?: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ name, label, onChange: propOnChange, onBlur: propOnBlur }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
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
        )}
      />
      {errors[name] && <FormHelperText error>{errors[name]?.message as string}</FormHelperText>}
    </>
  );
};

export default CustomCheckbox;