'use client';

import Image from 'next/image';

import SNS_CONFIG, { SnsType } from '@/features/card-detail/config/sns-config';
import { highlightText } from '@/shared/lib/highlightText';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import WrappedAvatar from '@/shared/ui/Avatar';
import Tag from '@/shared/ui/tag/tag';
import Thumbnail from '@/shared/ui/thumbnail';

import { Card } from '../types/interestCards';

type ReceivedCardProps = {
  cardData: Card;
  onClick?: () => void;
  searchValue?: string;
};

type RenderingThumbnailProps = {
  cardData: Card;
  searchValue?: string;
};

function RenderingThumbnail({ cardData, searchValue = '' }: RenderingThumbnailProps) {
  const previewInfoType = cardData.previewInfoType;
  const previewInfo = cardData.previewInfo;

  const snsType = previewInfo.sns?.type as SnsType | undefined;
  const snsIconPath = snsType ? SNS_CONFIG[snsType]?.iconPath : undefined;

  switch (previewInfoType) {
    case 'PROJECT':
      return (
        <Thumbnail
          tag="대표 프로젝트"
          title={highlightText(previewInfo.project?.title, searchValue ?? '')}
          description={previewInfo.project?.link}
          imageUrl={previewInfo.project?.imageUrl}
          className="!bg-gray-700"
        />
      );
    case 'CONTENT':
      return (
        <Thumbnail
          tag="작성한 글"
          title={highlightText(previewInfo.content?.title, searchValue ?? '')}
          description={previewInfo.content?.link}
          imageUrl={previewInfo.content?.imageUrl}
          className="!bg-gray-700"
        />
      );
    case 'HOBBY':
      return (
        <Thumbnail
          tag="취미"
          description={highlightText(previewInfo.hobby, searchValue ?? '')}
          className="!bg-gray-700"
        />
      );
    case 'SNS':
      return <Thumbnail tag="SNS" title={previewInfo.sns?.link} imageUrl={snsIconPath} className="!bg-gray-700" />;
    case 'NEWS':
      return (
        <Thumbnail
          tag="최근 소식"
          description={highlightText(previewInfo.news, searchValue ?? '')}
          className="!bg-gray-700"
        />
      );
    case 'REGION':
      return (
        <Thumbnail
          tag="활동 지역"
          description={highlightText(previewInfo.region, searchValue ?? '')}
          className="!bg-gray-700"
        />
      );
    default:
      return null;
  }
}

export default function ReceivedCard({ cardData, onClick, searchValue = '' }: ReceivedCardProps) {
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
              <p className="text-title-2">{highlightText(cardData.nickname, searchValue ?? '')}</p>
              <p className="truncate text-caption-1">{highlightText(cardData.organization, searchValue ?? '')}</p>
            </div>
            <p className="truncate text-body-3 text-white">{highlightText(cardData.detailJob, searchValue ?? '')}</p>
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
        {highlightText(cardData.summary, searchValue ?? '')}
      </p>
      <div className={cn('flex gap-1', spacingStyles({ marginBottom: 'md' }))}>
        {cardData.interestDomain.map((tag, index) => {
          return (
            <Tag
              key={index}
              size="sm"
              message={tag}
              className="bg-opacity-white-10 text-white"
              searchValue={searchValue}
            />
          );
        })}
      </div>
      <RenderingThumbnail cardData={cardData} searchValue={searchValue} />
    </div>
  );
}
