'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { spacingStyles } from '@/shared/spacing/spacing';
import Appbar from '@/shared/ui/appbar';

import JOB_CONFIG, { JobType } from '../config/jobs-config';
import { useCardDetailQuery } from '../hooks/query/useCardDetailQuery';

const CardDetailHeader = () => {
  const { id } = useParams();
  const { data } = useCardDetailQuery(id as string);

  const userJob = (data?.data?.job as JobType) || 'DEVELOPER';

  // config에서 해당 직군의 설정 가져오기
  const currentJob = JOB_CONFIG[userJob];

  return (
    <>
      <div
        className="card-detail-header w-full bg-cover bg-center pb-[40px]"
        style={{
          backgroundImage: `url('${currentJob.backgroundImage}')`,
        }}
      >
        {/* 카드 상세 헤더 */}
        <Appbar page="detail" />
        {/* 카드 상세 userData */}
        <div className={`flex w-full items-start ${spacingStyles({ marginTop: 'ms' })}`}>
          <div className={`flex w-full flex-col items-start ${spacingStyles({ paddingX: 'md' })}`}>
            <div className="flex w-full items-center justify-between">
              {/* 프로필 이미지 */}
              <div
                className={`flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gray-100 ${spacingStyles({ marginBottom: 'ms' })}`}
              >
                <Image src="/icons/avatarIcon.svg" alt="Settings" width="28" height="28" className="rounded-full" />
              </div>
              {/* 개발자 , 디자이너 아이콘 */}
              <Image src={currentJob.iconPath} alt={currentJob.iconAlt} width="30" height="30" />
            </div>
            <p className="title-1 line-clamp-1">{data.data.nickname}</p>
            <div
              className={`${spacingStyles({ marginBottom: 'ms' })} line-clamp-1 flex w-full items-center text-title-3`}
            >
              <span className={`max-w-1/2 truncate ${spacingStyles({ marginRight: 'sm' })}`}>
                {data?.data.detailJob}
              </span>
              {data?.data && (
                <>
                  <span className="flex-shrink-0 px-1">|</span>
                  <span className={`max-w-1/2 truncate ${spacingStyles({ marginLeft: 'sm' })}`}>
                    {data?.data.organization}
                  </span>
                </>
              )}
            </div>
            <p className="body-5 line-clamp-2">{data?.data.summary}</p>
            <div className={`${spacingStyles({ marginTop: 'md' })} flex items-center`}>
              <Image
                src="/icons/region.svg"
                alt="지역"
                width={16}
                height={16}
                className={`${spacingStyles({ marginRight: 'xs' })}`}
              />
              <p className="line-clamp-1 text-body-5">{data?.data.region}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CardDetailHeader.displayName = 'CardDetailHeader';

export default CardDetailHeader;
