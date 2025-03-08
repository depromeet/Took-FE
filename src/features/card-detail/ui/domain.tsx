import React from 'react';

import { spacingStyles } from '@/shared/spacing';
import Tag from '@/shared/ui/tag/tag';

import { DomainDto } from '../types/sample';

interface DomainListProps {
  data: DomainDto[];
}

function DomainList({ data }: DomainListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${spacingStyles({ marginTop: 'ms' })}`}>
      {data.map((e, i) => {
        return <Tag key={i} message={e.name} className="bg-opacity-purple-30" />;
      })}
    </div>
  );
}

export default DomainList;
