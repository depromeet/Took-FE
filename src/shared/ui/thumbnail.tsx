import React from 'react';

import Img from './img';

type thumbnailPropsType = {
  tag: '대표 프로젝트' | '작성한 글' | 'SNS' | '최근 소식' | '활동 지역' | '취미';
  title?: string; // '대표 프로젝트', '작성한 글', 'SNS'
  description?: string; // SNS를 제외한 전 tag
};

/** 공통 컴포넌트 : Thumbnail
 *
 * @example <Thumbnail tag="대표 프로젝트" title="프로젝트 제목" description="link" />
 * @example <Thumbnail tag="최근 소식" description={`부동산 스타트업에서 2년간 일하다가\n 퇴사하고 지금은 이직 준비 중이에요`} />
 *
 * @param {'대표 프로젝트' | '작성한 글' | 'SNS' | '최근 소식' | '활동 지역' | '취미'} tag - 썸네일 태그 (콘텐츠 유형)
 * @param {string} [title] - 대표 프로젝트, 작성한 글, SNS 태그에 해당하는 제목
 * @param {string} [description] - SNS를 제외한 태그에서 사용할 설명 (개행 포함 가능)
 *
 * @returns {JSX.Element} - Thumbnail 컴포넌트
 */
function Thumbnail({ tag, title, description }: thumbnailPropsType) {
  const isExistImg = tag === '대표 프로젝트' || tag === '작성한 글' || tag === 'SNS';

  return (
    <div className="flex items-center justify-start gap-2 rounded-md bg-opacity-white-20 p-3">
      {isExistImg && <Img size="medium" />}
      <div className="flex flex-col">
        <div className="mb-1 flex h-5 w-fit items-center justify-center rounded-[4px] bg-opacity-white-20 px-1 pr-1 text-caption-2 text-white">
          {tag}
        </div>
        {isExistImg && <p className="whitespace-pre-line text-body-5 text-white">{title}</p>}
        {description && <p className="whitespace-pre-line text-caption-1 text-white">{description}</p>}
      </div>
    </div>
  );
}
export default Thumbnail;
