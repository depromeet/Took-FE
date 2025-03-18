import React from 'react';

import { spacingStyles } from '@/shared/spacing';
import PostThumbnail from '@/shared/ui/postThumbnail';

import { ContentItemDto } from '../types/cardDetail';

interface PostsProps {
  data: ContentItemDto[];
}

function Posts({ data }: PostsProps) {
  return (
    <div className={`${spacingStyles({ marginTop: 'ms' })}`}>
      {data.map((post, i) => {
        return (
          <div key={i} className={`${spacingStyles({ marginBottom: 'ms' })} `}>
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
