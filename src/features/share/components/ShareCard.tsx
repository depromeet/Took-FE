import Image from 'next/image';
import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

import { JopType } from '@/features/home/types';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { Typography } from '@/shared/ui/typography';

import { DesignerIcon } from '../icons/DesignerIcon';
import { DeveloperIcon } from '../icons/DeveloperIcon';

import { DesignerCardBackground } from './background/DesignerCardBackground';
import { DeveloperCardBackground } from './background/DeveloperCardBackground';
import { ShareCardTag } from './ShareCardTag';

type WrappedCardProps = PropsWithChildren<
  {
    cardType: JopType;
  } & HTMLAttributes<HTMLDivElement>
>;

export const WrappedCard = forwardRef<HTMLDivElement, WrappedCardProps>(
  ({ cardType, children, className, ...rest }, ref) => {
    const Background = cardType === 'designer' ? DesignerCardBackground : DeveloperCardBackground;

    return (
      <div ref={ref} className={cn('relative h-[394px] w-[270px] overflow-hidden rounded-2xl', className)} {...rest}>
        <Background />
        <div className="absolute top-0 z-10 p-[24px]">{children}</div>
      </div>
    );
  },
);
WrappedCard.displayName = 'WrappedCard';

type ShareCardAvatarProps = {
  src: string;
  alt: string;
} & HTMLAttributes<HTMLImageElement>;

export const ShareCardAvatar = forwardRef<HTMLImageElement, ShareCardAvatarProps>(({ src, alt, ...rest }, ref) => {
  return (
    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
      <Image ref={ref} src={src} alt={alt} width={50} height={50} {...rest} />
    </div>
  );
});
ShareCardAvatar.displayName = 'CardAvatar';

type CardNameProps = {
  organization?: string;
};

export const ShareCardName = ({ organization, children }: PropsWithChildren<CardNameProps>) => {
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

export const ShareCardJob = ({ jobType, children }: PropsWithChildren<CardJobProps>) => {
  const Icon = jobType === 'designer' ? DesignerIcon : DeveloperIcon;

  return (
    <div className="mt-[2px] flex items-center gap-1">
      <Icon />
      <Typography variant="body-1">{children}</Typography>
    </div>
  );
};

export const ShareCardDescription = ({ children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => {
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

export const ShareCardTags = ({ tags, tagType, ...rest }: CardTagsProps & HTMLAttributes<HTMLDivElement>) => {
  let convertedTags = tags;

  if (tags.length > 4) {
    convertedTags = [...tags.slice(0, 3), `+ ${tags.length - 3}`];
  }

  return (
    <div className="mt-[44px] flex flex-wrap items-center gap-1" {...rest}>
      {convertedTags.map((tag, index) => (
        <ShareCardTag key={`${tag}-${index}`} tagType={tagType}>
          {tag}
        </ShareCardTag>
      ))}
    </div>
  );
};

type CardFooterProps = {
  footerTitle: string;
  title?: string;
  description?: string;
  imageUrl?: string;
};

export const ShareCardFooter = ({ footerTitle, title = '', description = '', imageUrl = '' }: CardFooterProps) => {
  return (
    <div className="mt-[14px] flex gap-2 rounded-md bg-[rgba(255,255,255,0.2)] p-[12px]">
      <div className="max-h-[60px] min-h-[60px] min-w-[60px] max-w-[60px] overflow-hidden rounded-md bg-white opacity-20">
        <Image src={imageUrl} alt="프로젝트 썸네일" width={60} height={60} style={{ objectFit: 'cover' }} />
      </div>
      <div>
        <div
          className={cn(
            spacingStyles({ paddingX: 'xs' }),
            'h-[19px] w-max overflow-hidden rounded-sm bg-[rgba(255,255,255,0.2)] py-[2px] text-[11px] text-white',
          )}
        >
          {footerTitle}
        </div>
        <div className="mt-1 flex flex-col">
          <Typography variant="body-5" className="line-clamp-1">
            {title}
          </Typography>
          <Typography variant="caption-2" className="line-clamp-1">
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
};
