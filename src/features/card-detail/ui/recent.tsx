import React from 'react';

import { spacingStyles } from '@/shared/spacing';

interface RecentNewsProps {
  data: string;
}

function RecentNews({ data }: RecentNewsProps) {
  return (
    <div className={`${spacingStyles({ marginTop: 'ms' })}`}>
      <p className="text-body-3">{data}</p>
    </div>
  );
}

export default RecentNews;
