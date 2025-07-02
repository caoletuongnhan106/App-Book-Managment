import { Controller } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

interface UploadFileProps {
  name: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  onBlur?: () => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ name, accept = 'image/*', onChange: propOnChange, onBlur: propOnBlur }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <Box>
          <input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              field.onChange(file);
              if (propOnChange) propOnChange(file);
            }}
            onBlur={() => {
              field.onBlur();
              if (propOnBlur) propOnBlur();
            }}
          />
          {fieldState.error && (
            <Typography variant="caption" color="error">
              {fieldState.error?.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default UploadFile;