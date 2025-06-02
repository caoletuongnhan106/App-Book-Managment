import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Checkbox, FormHelperText } from '@mui/material';

interface CustomCheckboxProps {
  name: string;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ name, label }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label={label}
          />
        )}
      />
      {errors[name] && <FormHelperText error>{errors[name]?.message as string}</FormHelperText>}
    </>
  );
};

export default CustomCheckbox;