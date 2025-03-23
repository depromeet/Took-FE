'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Toaster } from 'sonner';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { spacingStyles } from '@/shared/spacing/spacing';
import Appbar from '@/shared/ui/appbar';
import { BottomModal } from '@/shared/ui/bottomModal/bottomModal';
import { BottomMenuItem } from '@/shared/ui/bottomModal/bottomModalItem';
import BottomModalTitle from '@/shared/ui/bottomModal/bottomModalTitle';
import { MemoInput } from '@/shared/ui/bottomModal/memoInput';
import Tag from '@/shared/ui/tag/tag';

import JOB_CONFIG, { JobType } from '../config/jobs-config';
import { useCardDetailQuery } from '../hooks/query/useCardDetailQuery';
import { useBottomModal } from '../hooks/useBottomModal';

const CardDetailHeader = () => {
  const { cardId } = useParams();
  const { data } = useCardDetailQuery(Number(cardId));
  const { isModalOpen, headerRightHandler, closeModal } = useBottomModal();
  const [mode, setMode] = useState(false);
  const handleBack = useHistoryBack();

  const handleMode = () => {
    setMode(true);
  };

  const handleCancelMode = () => {
    setMode(false);
  };

  // isMyCard : 받은 명함 임시적으로 명시
  const isMyCard = false;

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
        <Appbar page="detail" onRightClick={headerRightHandler} onLeftClick={handleBack} />
        {/* 카드 상세 userData */}
        <div className={`flex w-full items-start ${spacingStyles({ marginTop: 'ms' })}`}>
          <div
            className={`flex w-full flex-col items-start ${spacingStyles({ paddingX: 'md' })} ${isModalOpen ? 'invisible' : 'visible'}`}
          >
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
            <p className="title-1 line-clamp-1">{data?.data.nickname}</p>
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
            {/* 이후 폴더를 map으로 수정 예정 */}
            {!isMyCard && data?.data.group && (
              <div className={`${spacingStyles({ marginTop: 'lg' })} flex items-center`}>
                {data?.data.group.map((e, i) => {
                  return (
                    <Tag
                      key={i}
                      message={e}
                      className={`${spacingStyles({ marginRight: 'sm' })} bg-opacity-white-20`}
                    />
                  );
                })}
              </div>
            )}

            {/* 한 줄 메모 */}
            {!isMyCard && data?.data.introduce && (
              <div
                className={`${spacingStyles({ paddingX: 'md', paddingY: 'ms', marginTop: 'md' })} w-full rounded-md bg-opacity-white-20`}
              >
                <span className="line-clamp-2 text-body-5">{data?.data.introduce}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {!mode ? (
        <BottomModal isModalOpen={isModalOpen} closeModal={closeModal} mode={mode}>
          <BottomMenuItem onClick={handleMode}>한줄 메모</BottomMenuItem>
          <BottomMenuItem>삭제하기</BottomMenuItem>
        </BottomModal>
      ) : (
        <BottomModal isModalOpen={isModalOpen} closeModal={handleCancelMode} mode={mode}>
          <BottomModalTitle>한줄 메모</BottomModalTitle>
          <MemoInput onClose={closeModal} handleCancelMode={handleCancelMode} />
        </BottomModal>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

CardDetailHeader.displayName = 'CardDetailHeader';

export default CardDetailHeader;
