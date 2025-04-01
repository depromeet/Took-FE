import { useState } from 'react';

export function useDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
  };
}
