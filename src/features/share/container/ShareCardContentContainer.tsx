'use client';

import {
  WrappedCard,
  ShareCardAvatar,
  ShareCardName,
  ShareCardJob,
  ShareCardDescription,
  ShareCardTags,
  ShareCardFooter,
} from '../components/ShareCard';
import { useCardQuery } from '../hooks/queries/useCardQuery';

export const ShareCardContentContainer = () => {
  const { data } = useCardQuery();

  return (
    <WrappedCard cardType={data.type} style={{ marginBottom: '20px' }}>
      <ShareCardAvatar src={data.profileImg} alt={`${data.name}의 프로필 이미지`} />
      <ShareCardName organization={data.organization}>{data.name}</ShareCardName>
      <ShareCardJob jobType={data.type}>{data.job}</ShareCardJob>
      <ShareCardDescription>{data.introduction}</ShareCardDescription>
      <ShareCardTags tagType={data.type} tags={data.tags} />
      <ShareCardFooter
        footerTitle={data.project.footerTitle}
        title={data.project.title}
        description={data.project.description}
        imageUrl={data.project.imageUrl}
      />
    </WrappedCard>
  );
};
