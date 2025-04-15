import { usePathname } from 'next/navigation';
import React from 'react';

import { tagConfig, ThumbnailTag } from '../config';
import { cn } from '../lib/utils';

import Img from './img';

type thumbnailPropsType = {
  tag: ThumbnailTag;
  title?: string | React.ReactNode; // '대표 프로젝트', '작성한 글', 'SNS'
  description?: string | React.ReactNode; // SNS를 제외한 전 tag
  imageUrl?: string;
  className?: string;
};

/** 공통 컴포넌트 : Thumbnail
 *
 * @example <Thumbnail tag="대표 프로젝트" title="프로젝트 제목" description="link" />
 * @example <Thumbnail tag="최근 소식" description={`부동산 스타트업에서 2년간 일하다가\n 퇴사하고 지금은 이직 준비 중이에요`} />
 *
 * @param {ThumbnailTag} tag - 썸네일 태그 (콘텐츠 유형)
 * @param {string} [title] - 대표 프로젝트, 작성한 글, SNS 태그에 해당하는 제목
 * @param {string} [description] - SNS를 제외한 태그에서 사용할 설명 (개행 포함 가능)
 *
 * @returns {JSX.Element} - Thumbnail 컴포넌트
 */

function Thumbnail({ tag, title, description, imageUrl, className }: thumbnailPropsType) {
  const config = tagConfig[tag];
  const pathname = usePathname();
  const isCardCreatePage = pathname === '/card-create/new-card/multi-step-form';

  return (
    <div
      className={cn(
        'flex h-[84px] w-auto min-w-[222px] items-center gap-2 rounded-md bg-opacity-white-20 p-3',
        className,
      )}
    >
      {config.hasImg && <Img size="medium" src={imageUrl} alt="" />}
      <div className="flex w-full max-w-full flex-col overflow-hidden">
        <div className="mb-1 flex h-5 w-fit items-center justify-center rounded-[4px] bg-opacity-white-20 px-1 pr-1 text-caption-2 text-white">
          {tag}
        </div>
        {config.hasImg && title && <p className="w-full truncate text-body-5 text-white">{title}</p>}
        {description && (
          <p
            className={`w-full truncate text-caption-1 text-white ${
              isCardCreatePage ? 'whitespace-pre-line' : 'whitespace-nowrap'
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
export default Thumbnail;
