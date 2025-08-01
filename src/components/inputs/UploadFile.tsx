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

    // Revoke previous preview if any
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    field.onChange(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Box>
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
          minHeight: 120,
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 40, color: '#1976d2' }} />
        <Typography variant="body2" sx={{ mt: 1, color: '#1976d2' }}>
          Click to upload book cover
        </Typography>
        {field.value instanceof File && (
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            {field.value.name}
          </Typography>
        )}
      </Box>

      {previewUrl && (
        <Box
          mt={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: 2,
            border: '1px solid #ccc',
            maxWidth: '100%',
            maxHeight: 200,
            mx: 'auto',
          }}
        >
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '200px',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
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
    </Box>
  );
};

export default UploadFile;
