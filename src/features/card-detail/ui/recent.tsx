import React from 'react';

import { spacingStyles } from '@/shared/spacing';

import { RecentNewsDto } from '../types/sample';

interface RecentNewsProps {
  data: RecentNewsDto;
}

function RecentNews({ data }: RecentNewsProps) {
  return (
    <div className={`${spacingStyles({ marginTop: 'ms' })}`}>
      <p className="text-body-3">{data.content}</p>
    </div>
  );
}

export default RecentNews;
