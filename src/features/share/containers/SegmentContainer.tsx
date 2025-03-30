import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const SegmentContainer = ({ className, ...restProps }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn(className)} {...restProps}>
      dseg
    </div>
  );
};
