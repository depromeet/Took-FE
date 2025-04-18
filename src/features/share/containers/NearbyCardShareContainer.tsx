import { motion, useAnimation, useMotionValue } from 'framer-motion';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { Typography } from '@/shared/ui/typography';

import { NearbyProfile } from '../components/NearbyProfile';
import { useNearbyCardsQuery } from '../hooks/queries/useNearbyCardQuery';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

type Params = {
  jobType: 'DESIGNER' | 'DEVELOPER';
};

export const NearbyCardShareContainer = ({ jobType }: Params) => {
  const y = useMotionValue(0);
  const controls = useAnimation();

  const { location } = useCurrentLocation(1000000);

  const { data } = useNearbyCardsQuery(location?.latitude, location?.longitude);

  const historyBack = useHistoryBack();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (info.offset.y > 200) {
      controls.start({ y: 600, transition: { duration: 0.4 } });
      setTimeout(() => {
        historyBack();
      }, 300);
    } else {
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } });
    }
  };

  const backgroundStyle = {
    backgroundColor: jobType === 'DEVELOPER' ? 'rgba(12, 109, 255, 0.4)' : 'rgba(92, 45, 255, 0.4)',
  };

  return (
    <>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 600 }}
        onDragEnd={(e, info) => handleDragEnd(e, info)}
        animate={controls}
        whileDrag={{ zIndex: 9999 }}
        style={{
          y,
        }}
      >
        <div
          className="flex h-[478px] w-[320px] flex-col items-center justify-end rounded-[24px] px-[30px] pb-10 pt-[28px]"
          style={backgroundStyle}
        >
          {data?.profiles.map(({ userId, cardId, nickname, detailJobEn, imagePath }) => (
            <NearbyProfile
              key={cardId}
              userId={userId}
              profileImg={imagePath}
              name={nickname}
              jobDetail={detailJobEn}
            />
          ))}
        </div>
      </motion.div>
      <div className="mt-[24px] rounded-full bg-[rgba(255,255,255,0.20)] px-[14px] py-[6px]">
        <Typography variant="body-5" style={{ color: 'var(--gray-600)' }}>
          아래로 스와이프하면 홈 화면으로 돌아갈 수 있어요
        </Typography>
      </div>
    </>
  );
};
