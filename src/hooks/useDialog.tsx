import { useState, useCallback, type ReactNode } from 'react';

interface DialogState {
  open: boolean;
  title: string;
  content: ReactNode;
  actions: ReactNode;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth: boolean;
}

interface UseDialogReturn {
  open: (title: string, content: ReactNode, actions?: ReactNode, maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', fullWidth?: boolean) => void;
  close: () => void;
  dialogProps: DialogState;
}

const useDialog = (): UseDialogReturn => {
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    title: '',
    content: null,
    actions: null,
    maxWidth: 'sm',
    fullWidth: false,
  });

  const open = useCallback(
    (
      title: string,
      content: ReactNode,
      actions?: ReactNode,
      maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm',
      fullWidth: boolean = false
    ) => {
      setDialogState({
        open: true,
        title,
        content,
        actions,
        maxWidth,
        fullWidth,
      });
    },
    []
  );

  const close = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  return { open, close, dialogProps: dialogState };
};

export default useDialog;