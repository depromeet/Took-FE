import React from 'react';

import { spacingStyles } from '@/shared/spacing';

import { HobbyDto } from '../types/sample';

interface HobbyProps {
  data: HobbyDto;
}

function Hobby({ data }: HobbyProps) {
  return (
    <div className={`${spacingStyles({ marginTop: 'ms' })}`}>
      <p className="text-body-3">{data.content}</p>
    </div>
  );
}

export default Hobby;
