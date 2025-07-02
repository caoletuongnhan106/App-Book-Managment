import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

interface CustomAutocompleteProps {
  name: string;
  label: string;
  options: string[];
  onChange?: (value: string | null) => void;
  onBlur?: () => void;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({ name, label, options, onChange: propOnChange, onBlur: propOnBlur }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message || ''}
            />
          )}
          {...field}
          onChange={(_, data) => {
            field.onChange(data);
            if (propOnChange) propOnChange(data);
          }}
          onBlur={() => {
            field.onBlur();
            if (propOnBlur) propOnBlur();
          }}
          value={field.value || null}
        />
      )}
    />
  );
};

export default CustomAutocomplete;