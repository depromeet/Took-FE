import { motion, useAnimation, useMotionValue } from 'framer-motion';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { Typography } from '@/shared/ui/typography';

import { QrInfo } from '../components/QrInfo';
import { QrLogo } from '../components/QrLogo';
import { ShareButton } from '../components/ShareButton';

type Params = {
  profileImg: string;
  name: string;
  job: string;
  jobType: 'DESIGNER' | 'DEVELOPER';
  url: string;
};

export const MyCardShareWithQrContainer = ({ profileImg, name, job, jobType, url }: Params) => {
  const y = useMotionValue(0);
  const controls = useAnimation();

  const backgroundStyle = {
    backgroundColor: jobType === 'DEVELOPER' ? 'rgba(12, 109, 255, 0.4)' : 'rgba(92, 45, 255, 0.4)',
  };

  const historyBack = useHistoryBack();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    event.stopPropagation();

    if (info.offset.y > 200) {
      controls.start({ y: 600, transition: { duration: 0.4 } });
      setTimeout(() => {
        historyBack();
      }, 300);
    } else {
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } });
    }
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
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <QrLogo />
              <ShareButton {...{ profileImg, name, jobName: job, jobType, linkUrl: url }} />
            </div>
            <Typography className="pb-[14px] pt-[18px]" variant="title-2">
              QR을 찍어 명함을 교환해 보세요
            </Typography>
          </div>
          <QrInfo {...{ profileImg, name, jobName: job, jobType, linkUrl: url }} />
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
