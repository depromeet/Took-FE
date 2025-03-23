import React from 'react';

import { Skeleton } from '@/shared/ui/skeleton';

function CardDetailSkelton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}

export default CardDetailSkelton;
