import { useState } from 'react';

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => setIsCopied(true));
    setTimeout(() => setIsCopied(false), 1500);
  };

  return { isCopied, handleCopy };
};
