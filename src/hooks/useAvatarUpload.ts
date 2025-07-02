import { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';

export const useAvatarUpload = (initialAvatar: string | null = null) => {
  const { enqueueSnackbar } = useSnackbar();
  const [avatar, setAvatar] = useState<string | null>(initialAvatar);

  const handleAvatarChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatar(base64);
        enqueueSnackbar('Cập nhật avatar thành công!', {
          variant: 'success',
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }, [enqueueSnackbar]);

  return { avatar, setAvatar, handleAvatarChange };
};