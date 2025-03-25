import { spacingStyles } from '@/shared/spacing';

import Empty from './empty';

interface RecentNewsProps {
  data: string;
}

function RecentNews({ data }: RecentNewsProps) {
  if (data.length === 0) {
    return <Empty />;
  }

  return (
    <div className={`${spacingStyles({ marginTop: 'ms' })}`}>
      <p className="text-body-3">{data}</p>
    </div>
  );
}

export default RecentNews;
