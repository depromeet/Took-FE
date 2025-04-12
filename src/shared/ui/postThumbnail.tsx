import React from 'react';

import { spacingStyles } from '../spacing';

import Img from './img';

type PostThumbnailProps = {
  title: string;
  description: string;
  link: string;
  imageSrc?: string;
};

/** Post 전용 썸네일 컴포넌트
 *
 * @example <PostThumbnail title="포스트 제목" link="https://example.com/post" />
 * @example <PostThumbnail title="포스트 제목" link="https://example.com/post" imageSrc="https://example.com/image.jpg" />
 *
 * @param {string} title - 포스트 제목
 * @param {string} link - 포스트 링크 URL
 * @param {string} [imageSrc] - 이미지 URL (제공될 경우 이 이미지가 표시됨, 없으면 기본 이미지 표시)
 *
 * @returns {JSX.Element} - PostThumbnail 컴포넌트
 */
function PostThumbnail({ title, description, link, imageSrc }: PostThumbnailProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className={`flex items-center justify-start rounded-md bg-gray-800 ${spacingStyles({ padding: 'md' })} `}>
        <div className={`${spacingStyles({ marginRight: 'ms' })} flex-shrink-0`}>
          <Img size="medium" src={imageSrc || '/icons/imageIcon.svg'} alt={title} />
        </div>
        <div className="flex flex-col">
          <p className="mb-[4ox] max-w-[210px] truncate text-body-5 text-white">{title}</p>
          <p className="mb-[4ox] max-w-[210px] truncate text-caption-1 text-gray-200">{description}</p>
          <p className="max-w-[210px] truncate text-caption-2 text-gray-600">{link}</p>
        </div>
      </div>
    </a>
  );
}

export default PostThumbnail;
