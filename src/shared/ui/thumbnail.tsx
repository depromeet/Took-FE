import React from 'react';

// type thumbnailPropsType = {
//   tag: '대표 프로젝트' | '작성한 글' | 'SNS' | '최근 소식' | '활동 지역' | '취미';
//   title?: string; // '대표 프로젝트', '작성한 글', 'SNS'
//   description?: string; // SNS를 제외한 전 tag
// };
function Thumbnail() {
  return (
    <>
      <div className="flex w-[222px] flex-col gap-1 rounded-md bg-opacity-white-20 p-3">
        <div className="flex h-5 w-fit items-center justify-center rounded-[4px] bg-opacity-white-20 px-1 pr-1 text-caption-2 text-white">
          최근 소식
        </div>
        <p className="whitespace-pre-line text-body-5 text-white">프로젝트 제목</p>
        <p className="whitespace-pre-line text-caption-1 text-white">
          부동산 스타트업에서 2년간 일하다가 {'\n'} 퇴사하고 지금은 이직 준비 중이에요
        </p>
      </div>
    </>
  );
}
export default Thumbnail;
/*
{ tag, title, description }: thumbnailPropsType
<>
      <div className="flex h-[84px] w-[222px] flex-col gap-1 rounded-md bg-opacity-white-20 p-3">
        <div className="flex h-5 w-fit items-center justify-center rounded-[4px] bg-opacity-white-20 px-1 pr-1 text-caption-2 text-white">
          최근 소식{tag}
        </div>
        <p className="whitespace-pre-line text-body-5 text-white">{title}</p>
        <p className="whitespace-pre-line text-caption-1 text-white">
          {description}
        </p>
      </div>
    </>

*/
