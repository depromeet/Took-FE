'use client';

import Image from 'next/image';

import { Card } from '@/features/home/types';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import WrappedAvatar from '@/shared/ui/Avatar';
import Tag from '@/shared/ui/tag/tag';
import Thumbnail from '@/shared/ui/thumbnail';

type ReceivedCardProps = {
  cardData: Card;
  onClick?: () => void;
};

function RenderingThumbnail({ cardData }: { cardData: Card }) {
  const previewInfoType = cardData.previewInfoType;
  const previewInfo = cardData.previewInfo;

  switch (previewInfoType) {
    case 'PROJECT':
      return (
        <Thumbnail
          tag="대표 프로젝트"
          title={previewInfo.project?.title}
          description={previewInfo.project?.link}
          className="!bg-gray-700"
        />
      );
    case 'CONTENT':
      return (
        <Thumbnail
          tag="작성한 글"
          title={previewInfo.content?.title}
          description={previewInfo.content?.link}
          imageUrl={previewInfo.content?.imageUrl}
          className="!bg-gray-700"
        />
      );
    case 'HOBBY':
      return <Thumbnail tag="취미" description={previewInfo.hobby} className="!bg-gray-700" />;
    case 'SNS':
      return (
        <Thumbnail
          tag="SNS"
          title={previewInfo.sns?.link}
          imageUrl={previewInfo.content?.imageUrl} // sns icon 조건부 렌더링 추후 구현
          className="!bg-gray-700"
        />
      );
    case 'NEWS':
      return <Thumbnail tag="최근 소식" description={previewInfo.news} className="!bg-gray-700" />;
    case 'REGION':
      return <Thumbnail tag="활동 지역" description={previewInfo.region} className="!bg-gray-700" />;
    default:
      return null;
  }
}

export default function ReceivedCard({ cardData, onClick }: ReceivedCardProps) {
  return (
    <div
      className={cn(
        'flex h-auto w-full max-w-full cursor-pointer flex-col justify-center rounded-2xl bg-gray-800',
        spacingStyles({ paddingX: 'ml', paddingY: 'ml' }),
      )}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <WrappedAvatar src={cardData?.imagePath} alt="" size="medium" />
          <div className="flex flex-col items-start">
            <div className="flex items-center justify-start gap-2 text-white">
              <p className="text-title-2">{cardData.nickname}</p>
              <p className="truncate text-caption-1">{cardData.organization}</p>
            </div>
            <p className="truncate text-body-3 text-white">{cardData.detailJob}</p>
          </div>
        </div>
        {cardData.job === 'DEVELOPER' ? (
          <Image
            src="/icons/developer-icon-white.svg"
            alt="icon"
            width={12}
            height={12}
            className="mr-1 mt-1 self-start"
          />
        ) : (
          <Image
            src="/icons/designer-icon-white.svg"
            alt="icon"
            width={12}
            height={12}
            className="mr-1 mt-1 self-start"
          />
        )}
      </div>
      <p className={cn('truncate text-body-5 text-white', spacingStyles({ marginTop: 'md', marginBottom: 'lg' }))}>
        {cardData.summary}
      </p>
      <div className={cn('flex gap-1', spacingStyles({ marginBottom: 'md' }))}>
        {cardData.interestDomain.map((tag, index) => {
          return <Tag key={index} size="sm" message={tag} className="bg-opacity-white-10 text-white" />;
        })}
      </div>
      <RenderingThumbnail cardData={cardData} />
    </div>
  );
}
