'use client';

import Image from 'next/image';
import { forwardRef, HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';

import { DesignerCardBackground } from '@/features/home/components/BusinessCard/Background/DesignerCardBackground';
import { DeveloperCardBackground } from '@/features/home/components/BusinessCard/Background/DeveloperCardBackground';
import { JopType } from '@/features/home/types';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Img from '@/shared/ui/img';

import { Typography } from '../../../../shared/ui/typography';
import { DesignerIcon } from '../icons/DesignerIcon';
import { DeveloperIcon } from '../icons/DeveloperIcon';

import { CardTag } from './CardTag';

type WrappedCardProps = PropsWithChildren<
  {
    cardType: JopType;
  } & HTMLAttributes<HTMLDivElement>
>;

export const WrappedCard = forwardRef<HTMLDivElement, WrappedCardProps>(
  ({ cardType, children, className, ...rest }, ref) => {
    const Background = cardType === 'DESIGNER' ? DesignerCardBackground : DeveloperCardBackground;

    return (
      <div ref={ref} className={cn('relative h-[394px] w-[270px] overflow-hidden rounded-2xl', className)} {...rest}>
        <Background />
        <div className="absolute top-0 z-10 h-full w-full p-[24px]">{children}</div>
      </div>
    );
  },
);
WrappedCard.displayName = 'WrappedCard';

type CardAvatarProps = {
  src: string;
  alt: string;
} & HTMLAttributes<HTMLImageElement>;

export const CardAvatar = forwardRef<HTMLImageElement, CardAvatarProps>(({ src, alt, ...rest }, ref) => {
  const [imageSrc, setImageSrc] = useState(src || '/icon/default-image-s.svg');

  useEffect(() => {
    setImageSrc(src || '/icon/default-image-s.svg');
  }, [src]);

  return (
    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
      <Image
        ref={ref}
        src={imageSrc}
        alt={alt}
        width={50}
        height={50}
        {...rest}
        onError={() => {
          setImageSrc('/icon/default-image-s.svg');
        }}
      />
    </div>
  );
});
CardAvatar.displayName = 'CardAvatar';

type CardNameProps = {
  organization?: string;
};

export const CardName = ({ organization, children }: PropsWithChildren<CardNameProps>) => {
  return (
    <div className="mt-[12px] flex items-end gap-2">
      <Typography variant="title-1">{children}</Typography>
      <Typography variant="caption-1">{organization}</Typography>
    </div>
  );
};

type CardJobProps = {
  jobType: JopType;
};

export const CardJob = ({ jobType, children }: PropsWithChildren<CardJobProps>) => {
  const Icon = jobType === 'DESIGNER' ? DesignerIcon : DeveloperIcon;

  return (
    <div className="mt-[2px] flex items-center gap-1">
      <Icon />
      <Typography variant="body-1">{children}</Typography>
    </div>
  );
};

export const CardDescription = ({ children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => {
  const { className, ...restProps } = rest;

  return (
    <div className="mt-[12px]">
      <Typography as="p" variant="body-5" className={cn('line-clamp-2', className)} {...restProps}>
        {children}
      </Typography>
    </div>
  );
};

type CardTagsProps = {
  tags: string[];
  tagType: JopType;
};

export const CardTags = ({ tags, tagType, ...rest }: CardTagsProps & HTMLAttributes<HTMLDivElement>) => {
  let convertedTags = tags;

  if (tags.length > 4) {
    convertedTags = [...tags.slice(0, 3), `+ ${tags.length - 3}`];
  }

  return (
    <div className="mt-[44px] flex flex-wrap items-center gap-1" {...rest}>
      {convertedTags.map((tag, index) => (
        <CardTag key={`${tag}-${index}`} tagType={tagType}>
          {tag}
        </CardTag>
      ))}
    </div>
  );
};

type CardFooterProps = {
  previewInfo: string;
  title?: string;
  description?: string;
  imageUrl?: string;
};

export const CardFooter = ({ previewInfo, title = '', description = '', imageUrl = '' }: CardFooterProps) => {
  const shouldShowThumbnail = ['대표 프로젝트', '작성한 글', 'SNS'].includes(previewInfo);
  const isSns = previewInfo === 'SNS';
  return (
    <div className="mt-[14px] flex gap-2 rounded-md bg-[rgba(255,255,255,0.2)] p-[12px]">
      {shouldShowThumbnail && (
        <div className="relative max-h-[60px] min-h-[60px] min-w-[60px] max-w-[60px] overflow-hidden rounded-md bg-opacity-white-20">
          {isSns ? (
            <Img size="small" alt={`${title} 아이콘`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Img
                src={imageUrl || '/icons/imageIcon.svg'}
                alt="프로젝트 썸네일"
                size="small"
                className="h-full w-full border-0 p-0"
              />
            </div>
          )}
        </div>
      )}
      <div>
        <div
          className={cn(
            spacingStyles({ paddingX: 'xs' }),
            'h-[19px] w-max overflow-hidden rounded-sm bg-[rgba(255,255,255,0.2)] py-[2px] text-[11px] text-white',
          )}
        >
          {previewInfo}
        </div>
        <div className="mt-1 flex flex-col">
          <Typography variant="body-5" className="max-w-[130px] truncate">
            {title}
          </Typography>
          <Typography variant="caption-2" className="max-w-[130px] truncate">
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
};
