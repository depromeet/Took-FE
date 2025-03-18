import React from 'react';

import { spacingStyles } from '@/shared/spacing';

interface HobbyProps {
  data: string;
}

function Hobby({ data }: HobbyProps) {
  return (
    <div className={`${spacingStyles({ marginTop: 'ms' })}`}>
      <p className="text-body-3">{data}</p>
    </div>
  );
}

export default Hobby;
