'use client';

import Image from 'next/image';
import { useState } from 'react';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { spacingStyles } from '@/shared/spacing/spacing';
import Appbar from '@/shared/ui/appbar';
import Tag from '@/shared/ui/tag/tag';

import JOB_CONFIG, { JobType } from '../config/jobs-config';
import { useBottomModal } from '../hooks/useBottomModal';
import { useScroll } from '../hooks/useScroll';
import { CardDetailDto } from '../types/cardDetail';

import BottomSheet from './bottomSheet';

interface CardDetailHeaderProps {
  data: CardDetailDto;
  type: string;
}

const CardDetailHeader = ({ data, type }: CardDetailHeaderProps) => {
  const { isModalOpen, headerRightHandler, closeModal } = useBottomModal();
  const [mode, setMode] = useState(false);
  const handleBack = useHistoryBack();
  const isScroll = useScroll();

  const handleMode = () => {
    setMode(true);
  };

  const handleCancelMode = () => {
    setMode(false);
  };

  // isMyCard : 명함 타입 명시 (내 명함 , 받은 명함)
  const isMyCard = type === 'mycard' ? true : false;

  const userJob = (data?.data?.job as JobType) || 'developer';

  // config에서 해당 직군의 설정 가져오기
  const currentJob = JOB_CONFIG[userJob];

  return (
    <>
      <div
        className="w-full bg-cover bg-center pb-[50px]"
        style={{
          backgroundImage: `url('${currentJob?.backgroundImage}')`,
        }}
      >
        {/* 카드 상세 헤더 */}
        <Appbar page="detail" onRightClick={headerRightHandler} onLeftClick={handleBack} isBlurred={isScroll} />
        {/* 카드 상세 userData */}
        <div className={`flex w-full items-start ${spacingStyles({ marginTop: 'ms' })}`}>
          <div
            className={`flex w-full flex-col items-start ${spacingStyles({ paddingX: 'md' })} ${isModalOpen ? 'invisible' : 'visible'}`}
          >
            <div className={`flex w-full items-center justify-between ${spacingStyles({ marginBottom: 'ms' })}`}>
              {/* 프로필 이미지 */}
              {data?.data?.nickname && (
                <div className="relative flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gray-100">
                  <Image
                    src={data?.data.imagePath || '/icons/avatarIcon.png'}
                    alt="프로필 이미지"
                    fill
                    className="rounded-full"
                  />
                </div>
              )}
              {/* /icons/avatarIcon.svg */}

              {/* 개발자 , 디자이너 아이콘 */}
              {data?.data?.job && <Image src={currentJob.iconPath} alt={currentJob.iconAlt} width="28" height="28" />}
            </div>
            <p className="line-clamp-1 text-title-1">{data?.data.nickname}</p>
            <div
              className={`${spacingStyles({ marginBottom: 'ms' })} line-clamp-1 flex w-full items-center text-title-3`}
            >
              <span className={`max-w-1/2 truncate ${spacingStyles({ marginRight: 'sm' })}`}>
                {data?.data.detailJob}
              </span>
              {data?.data.organization && (
                <>
                  <div className="h-[18px] w-[2px] bg-white"></div>
                  <span className={`max-w-1/2 truncate ${spacingStyles({ marginLeft: 'sm' })}`}>
                    {data?.data.organization}
                  </span>
                </>
              )}
            </div>
            <p className="line-clamp-2 text-body-5">{data?.data.summary}</p>
            {data?.data.region && (
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
            )}
            {/* 이후 폴더를 map으로 수정 예정 */}
            {!isMyCard && data?.data.folders && (
              <div className={`${spacingStyles({ marginTop: 'lg' })} flex items-center`}>
                {data?.data.folders.map((e, i) => {
                  return (
                    <Tag
                      key={i}
                      message={e.name}
                      className={`${spacingStyles({ marginRight: 'sm' })} bg-opacity-white-20 text-body-5`}
                    />
                  );
                })}
              </div>
            )}
            {/* 한 줄 메모 */}
            {!isMyCard && data?.data.memo && (
              <div
                className={`${spacingStyles({ paddingX: 'md', paddingY: 'ms', marginTop: 'md' })} w-full rounded-md bg-opacity-white-20`}
              >
                <span className="line-clamp-2 text-body-5">{data?.data.memo}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomSheet
        mode={mode}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleMode={handleMode}
        handleCancelMode={handleCancelMode}
        memo={data?.data.memo as string}
      />
    </>
  );
};

CardDetailHeader.displayName = 'CardDetailHeader';

export default CardDetailHeader;
