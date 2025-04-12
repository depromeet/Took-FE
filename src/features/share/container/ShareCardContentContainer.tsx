'use client';

import { Card, JopType, PreviewInfoType } from '@/features/home/types';

import {
  WrappedCard,
  ShareCardAvatar,
  ShareCardName,
  ShareCardJob,
  ShareCardDescription,
  ShareCardTags,
  ShareCardFooter,
} from '../components/ShareCard';
import { PreviewInfo } from '../types';
import { convertPreviewInfo } from '../utils/convertPreviewType';
import { getPreviewContentByType } from '../utils/getPreviewContent';

type ShareCardContentContainerProps = {
  cardData: Card;
};

export const ShareCardContentContainer = ({ cardData }: ShareCardContentContainerProps) => {
  const getPreviewContent = () => {
    if (!cardData?.previewInfo || !cardData?.previewInfoType) return {};

    const previewInfo = cardData.previewInfo as PreviewInfo;
    const type = cardData.previewInfoType.toUpperCase();

    return getPreviewContentByType(previewInfo, type);
  };

  const previewContent = getPreviewContent();

  return (
    <WrappedCard cardType={cardData?.job as JopType} style={{ marginBottom: '20px' }}>
      <ShareCardAvatar
        src={cardData?.imagePath || '/icons/avatarIcon.png'}
        alt={`${cardData?.nickname}의 프로필 이미지`}
      />
      <ShareCardName organization={cardData?.organization}>{cardData?.nickname}</ShareCardName>
      <ShareCardJob jobType={cardData?.job as JopType}>{cardData?.detailJob}</ShareCardJob>
      <ShareCardDescription>{cardData?.summary}</ShareCardDescription>
      <ShareCardTags tagType={cardData?.job as JopType} tags={cardData?.interestDomain || []} />
      <ShareCardFooter
        previewInfo={convertPreviewInfo(cardData?.previewInfoType as PreviewInfoType)}
        title={previewContent.title}
        description={previewContent.description}
        imageUrl={previewContent.imageUrl}
      />
    </WrappedCard>
  );
};
