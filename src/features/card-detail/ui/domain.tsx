import { spacingStyles } from '@/shared/spacing';
import Tag from '@/shared/ui/tag/tag';

interface DomainListProps {
  data: string[];
}

function DomainList({ data }: DomainListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${spacingStyles({ marginTop: 'ms' })}`}>
      {data.map((name, i) => {
        return <Tag key={i} message={name} className="line-clamp-1 bg-opacity-purple-30" />;
      })}
    </div>
  );
}

export default DomainList;
