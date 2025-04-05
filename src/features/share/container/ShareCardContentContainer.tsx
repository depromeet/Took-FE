'use client';

import SNS_CONFIG from '@/features/card-detail/config/sns-config';
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

type ShareCardContentContainerProps = {
  cardData: Card;
};

export const ShareCardContentContainer = ({ cardData }: ShareCardContentContainerProps) => {
  const getPreviewContent = () => {
    if (!cardData?.previewInfo || !cardData?.previewInfoType) return {};

    const previewInfo = cardData.previewInfo as PreviewInfo;
    const type = cardData.previewInfoType.toUpperCase();

    switch (type) {
      case 'PROJECT':
        return previewInfo.project
          ? {
              title: previewInfo.project.title,
              description: previewInfo.project.description,
              imageUrl: previewInfo.project.imageUrl,
            }
          : {};
      case 'CONTENT':
        return previewInfo.content
          ? {
              title: previewInfo.content.title,
              description: previewInfo.content.description,
              imageUrl: previewInfo.content.imageUrl,
            }
          : {};
      case 'SNS':
        return previewInfo.sns
          ? {
              title: previewInfo.sns.type,
              description: previewInfo.sns.link,
              imageUrl: SNS_CONFIG[previewInfo.sns.type as keyof typeof SNS_CONFIG]?.iconPath || '/icons/imageIcon.svg',
            }
          : {};
      case 'HOBBY':
        return previewInfo.hobby
          ? {
              title: previewInfo.hobby,
              description: '',
            }
          : {};
      case 'NEWS':
        return previewInfo.news
          ? {
              title: previewInfo.news,
              description: '',
            }
          : {};
      case 'REGION':
        return previewInfo.region
          ? {
              title: previewInfo.region,
              description: '',
            }
          : {};
      default:
        return {};
    }
  };

  const previewContent = getPreviewContent();

  console.log('previewContent : ' + previewContent.title, previewContent.imageUrl, previewContent.description);

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

const convertPreviewInfo = (previewInfo: PreviewInfoType) => {
  return {
    PROJECT: '대표 프로젝트',
    CONTENT: '작성한 글',
    HOBBY: '취미',
    SNS: 'SNS',
    NEWS: '최근 소식',
    REGION: '활동 지역',
  }[previewInfo];
};
