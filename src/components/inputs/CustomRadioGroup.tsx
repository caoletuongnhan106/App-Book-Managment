import { Controller } from 'react-hook-form';
import { RadioGroup, Radio, FormControlLabel, FormHelperText } from '@mui/material';

interface CustomRadioGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({ name, options, onChange: propOnChange, onBlur: propOnBlur }) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState }) => (
          <>
            <RadioGroup
              {...field}
              onChange={(e) => {
                field.onChange(e.target.value);
                if (propOnChange) propOnChange(e.target.value);
              }}
              onBlur={() => {
                field.onBlur();
                if (propOnBlur) propOnBlur();
              }}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {fieldState.error && <FormHelperText error>{fieldState.error?.message}</FormHelperText>}
          </>
        )}
      />
    </>
  );
};

export default CustomRadioGroup;