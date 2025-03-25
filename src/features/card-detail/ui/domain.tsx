import { spacingStyles } from '@/shared/spacing';
import Tag from '@/shared/ui/tag/tag';

import Empty from './empty';

interface DomainListProps {
  data: string[];
}

function DomainList({ data }: DomainListProps) {
  if (!data || data.length === 0) {
    return <Empty />;
  }
  return (
    <div className={`flex flex-wrap gap-2 ${spacingStyles({ marginTop: 'ms' })}`}>
      {data.map((name, i) => {
        return <Tag key={i} message={name} className="line-clamp-1 bg-opacity-purple-30" />;
      })}
    </div>
  );
}

export default DomainList;
