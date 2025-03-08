'use client';

import Image from 'next/image';

import { spacingStyles } from '@/shared/spacing/spacing';
import Appbar from '@/shared/ui/appbar';
import { Typography } from '@/shared/ui/typography';

import { useUser, useUserDetail } from '../hooks/sample';
//import useReverseScrollView from '../hooks/useReverseScrollView';

const CardDetailHeader = () => {
  const { data: userData } = useUser();
  const { data: userDataDetail } = useUserDetail();
  //const { isReverseScroll } = useReverseScrollView();

  // isReverseScroll 값이 변경될 때마다 부모에게 알림
  // useEffect(() => {
  //   onReverseScroll(isReverseScroll);
  // }, [isReverseScroll, onReverseScroll]);

  // const { ref } = useBottomOffset({
  //   offset: 0,
  //   onTrigger: () => {
  //     console.log('트리거 감지됨');
  //     setToggle((prev) => !prev);
  //     if (isReverseScroll && toggle) {
  //       console.log('역스크롤 감지됨', isReverseScroll);
  //       onReverseScroll(true);
  //     }
  //   },
  // });

  return (
    <>
      <div
        className="card-detail-header w-full bg-cover bg-center pb-[40px]"
        style={{
          backgroundImage: `url('/images/card-detail/card-detail-develop.png')`,
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
              <Image src="/icons/developer-icon-white.svg" alt="developerIcon" width="30" height="30" />
            </div>
            <Typography variant="title-1">{userData?.userData.name}</Typography>
            <div className={`${spacingStyles({ marginBottom: 'ms' })} flex text-title-3`}>
              <p className={`${spacingStyles({ marginRight: 'sm' })}`}>{userDataDetail?.userDataDetail.jobTitle}</p>
              {userDataDetail?.userDataDetail.jobTitle && (
                <>
                  <span>|</span>
                  <p className={`${spacingStyles({ marginLeft: 'sm' })}`}>
                    {userDataDetail?.userDataDetail.organization}
                  </p>
                </>
              )}
            </div>
            <Typography variant="body-5">{userDataDetail?.userDataDetail.summary}</Typography>
            <div className={`${spacingStyles({ marginTop: 'md' })} flex items-center`}>
              <Image
                src="/icons/region.svg"
                alt="지역"
                width={16}
                height={16}
                className={`${spacingStyles({ marginRight: 'xs' })}`}
              />
              <p>{userDataDetail?.userDataDetail.region}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CardDetailHeader.displayName = 'CardDetailHeader';

export default CardDetailHeader;
