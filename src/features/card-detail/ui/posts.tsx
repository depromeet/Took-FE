import { spacingStyles } from '@/shared/spacing';
import PostThumbnail from '@/shared/ui/postThumbnail';

import Empty from '../components/empty';
import { ContentItemDto } from '../types/cardDetail';

interface PostsProps {
  data: ContentItemDto[];
}

function Posts({ data }: PostsProps) {
  if (!data || data.length === 0) {
    return <Empty />;
  }
  return (
    <div>
      {data.map((post, i) => {
        return (
          <div key={i} className={`${spacingStyles({ marginBottom: 'ms' })}`}>
            <PostThumbnail
              title={post.title}
              description={post.description}
              link={post.link || ''}
              imageSrc={post.imageUrl || undefined}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
