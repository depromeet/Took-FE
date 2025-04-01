import React from 'react';

import { spacingStyles } from '@/shared/spacing';

function Empty() {
  return (
    <div className={`flex w-full items-center justify-center ${spacingStyles({ paddingY: 'lg' })}`}>
      <p className="text-body-1 text-gray-500">등록된 정보가 없어요</p>
    </div>
  );
}

export default Empty;
