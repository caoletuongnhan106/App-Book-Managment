import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup, Radio, FormControlLabel, FormHelperText } from '@mui/material';

interface CustomRadioGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({ name, options }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue="new"
        render={({ field }) => (
          <RadioGroup {...field}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
      />
      {errors[name] && <FormHelperText error>{errors[name]?.message as string}</FormHelperText>}
    </>
  );
};

export default CustomRadioGroup;