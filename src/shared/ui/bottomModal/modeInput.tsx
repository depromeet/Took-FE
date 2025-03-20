// MemoInput.tsx
import { useState } from 'react';
import { toast } from 'sonner';

import { spacingStyles } from '@/shared/spacing';

interface MemoInputProps {
  onClose: () => void;
  handleCancelMode: () => void;
}

const MAX_LENGTH = 40;

export const ModeInput = ({ onClose, handleCancelMode }: MemoInputProps) => {
  const [memoText, setMemoText] = useState('');

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onClose();
      handleCancelMode();
      toast.success('한줄 메모를 등록했어요');
    }
  };

  return (
    <>
      <div className="w-full">
        <input
          type="text"
          inputMode="text"
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
          placeholder="텍스트..."
          className={`mb-4 w-full bg-transparent p-2 text-body-3 text-white placeholder:text-white focus:outline-none ${spacingStyles({ padding: 'ml' })}`}
          maxLength={MAX_LENGTH}
          autoFocus
          onKeyDown={handleSubmit}
        />

        <div className={`${spacingStyles({ paddingX: 'ml' })} flex items-center justify-end`}>
          <p className="text-caption-1">
            {memoText.length}/{MAX_LENGTH}
          </p>
        </div>
      </div>
    </>
  );
};
