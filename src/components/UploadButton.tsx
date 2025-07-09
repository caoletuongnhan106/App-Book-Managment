import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface UploadButtonProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box
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
      onClick={() => inputRef.current?.click()}
    >
      <CloudUploadIcon sx={{ fontSize: 40, color: '#1976d2' }} />
      <Typography variant="body2" sx={{ mt: 1, color: '#1976d2' }}>
        Chọn ảnh bìa sách
      </Typography>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default UploadButton;
