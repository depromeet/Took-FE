import Empty from '../components/empty';

interface RecentNewsProps {
  data: string;
}

function RecentNews({ data }: RecentNewsProps) {
  if (data.length === 0) {
    return <Empty />;
  }

  return (
    <div>
      <p className="text-body-3">{data}</p>
    </div>
  );
}

export default RecentNews;
