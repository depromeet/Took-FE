import Image from 'next/image';

import { Typography } from '@/shared/ui/typography';

interface OnboardingSlideProps {
  description: string | string[];
  imageUrl: string;
  pagination?: React.ReactNode;
}

function OnboardingSlide({ description, imageUrl, pagination }: OnboardingSlideProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <div className="absolute inset-0 flex w-full items-center justify-center">
        <div className="relative h-[75%] w-[65%]">
          <Image src={imageUrl} alt="온보딩 이미지" fill style={{ objectFit: 'contain' }} priority />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black via-black to-transparent pt-32">
        <div className="flex flex-col items-center px-6">
          {pagination && <div className="mb-6">{pagination}</div>}

          {/* 이게 좋은 방법인지는 잘 모르겠습니다.. */}
          {Array.isArray(description) ? (
            description.map((line, index) => (
              <Typography key={index} variant="title-2">
                {line}
              </Typography>
            ))
          ) : (
            <Typography variant="body-1">{description}</Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default OnboardingSlide;
