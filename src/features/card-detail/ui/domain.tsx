import Tag from '@/shared/ui/tag/tag';

import Empty from '../components/empty';

interface DomainListProps {
  data: string[];
}

function DomainList({ data }: DomainListProps) {
  if (!data || data.length === 0) {
    return <Empty />;
  }
  return (
    <div className="flex flex-wrap gap-x-2">
      {data.map((name, i) => {
        return <Tag key={i} message={name} className="line-clamp-1 bg-opacity-purple-30" />;
      })}
    </div>
  );
}

export default DomainList;
