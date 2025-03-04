import Image from 'next/image';

import { Typography } from '@/shared/ui/typography';

interface OnboardingSlideProps {
  description: string[];
  imageUrl: string;
}

function OnboardingSlide({ description, imageUrl }: OnboardingSlideProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <div className="absolute inset-0 flex w-full items-center justify-center">
        <div className="relative h-[75%] w-[65%]">
          <Image src={imageUrl} alt="온보딩 이미지" fill className="object-contain" priority />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black via-black to-transparent pt-32">
        <div className="flex flex-col items-center px-6 pt-16">
          {description.map((line, index) => (
            <Typography key={index} variant="title-2">
              {line}
            </Typography>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnboardingSlide;
