import React, { ReactNode } from 'react';

interface BottomModalTitleProps {
  children: ReactNode;
}

function BottomModalTitle({ children }: BottomModalTitleProps) {
  return (
    <div className="mb-4 w-full text-center">
      <div className="w-full text-body-2 font-bold text-white">{children}</div>
    </div>
  );
}

export default BottomModalTitle;
