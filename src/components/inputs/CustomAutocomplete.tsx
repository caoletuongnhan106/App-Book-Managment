import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

interface CustomAutocompleteProps {
  name: string;
  label: string;
  options: string[];
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({ name, label, options }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                error={!!errors[name]}
                helperText={errors[name] ? (errors[name]?.message as string) : ''}
              />
            )}
            {...field}
            onChange={(_, data) => field.onChange(data)}
            value={field.value || null}
          />
        )}
      />
    </>
  );
};

export default CustomAutocomplete;