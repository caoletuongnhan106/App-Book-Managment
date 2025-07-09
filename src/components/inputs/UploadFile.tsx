import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useController, useFormContext } from 'react-hook-form';

interface UploadFileProps {
  name: string;
  accept?: string;
}

const UploadFile: React.FC<UploadFileProps> = ({ name, accept = 'image/*' }) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    field.onChange(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          border: '2px dashed #1976d2',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#f0f7ff',
            borderColor: '#1565c0',
          },
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 40, color: '#1976d2' }} />
        <Typography variant="body2" sx={{ mt: 1, color: '#1976d2' }}>
          Click to upload book cover
        </Typography>
        {field.value && (
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            {field.value.name}
          </Typography>
        )}
      </Box>

      {previewUrl && (
        <Box mt={2} textAlign="center">
          <Typography variant="body2" sx={{ mb: 1 }}>Preview:</Typography>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxHeight: 150, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          />
        </Box>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default UploadFile;
