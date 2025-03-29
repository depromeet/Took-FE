import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const ShareTopSvg = () => {
  return (
    <div className="pt-40px flex w-full items-center justify-center">
      <svg
        className="mt-[54px] h-auto w-full max-w-[340px] md:max-w-[420px]"
        viewBox="0 0 340 354"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          opacity="0.7"
          d="M167.019 103.077C227.057 66.7077 291.654 59.4617 316.016 99.678C353.384 161.365 307.715 236.556 247.678 272.925C187.64 309.295 94.3037 320.473 69.9416 280.257C45.5795 240.041 106.982 139.446 167.019 103.077Z"
          fill="#5A23FF"
          fillOpacity="1"
        />
        <path
          opacity="0.7"
          d="M53.8871 173.59C25.495 115.518 23.4804 56.0203 61.1553 37.6006C118.944 9.34721 161.928 48.8149 190.32 106.887C218.712 164.959 181.854 266.073 144.179 284.493C106.504 302.913 82.2792 231.662 53.8871 173.59Z"
          fill="#0073FF"
          fillOpacity="1"
        />
      </svg>
    </div>
  );
};

export const ShareBottomSvg = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full">
      <svg
        width="100%"
        height="290"
        preserveAspectRatio="none"
        viewBox="0 0 360 319"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="360" height="319" fill="url(#paint0_linear_2245_53621)" fillOpacity="0.5" />
        <defs>
          <linearGradient
            id="paint0_linear_2245_53621"
            x1="180"
            y1="41.2234"
            x2="180"
            y2="319"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2370FF" stopOpacity="0" />
            <stop offset="1" stopColor="#7023FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const ShareBackground = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn('relative h-dvh w-full', className)}>
      <div className="bg-[rgba(255,255,255, 0.1)] absolute h-full w-full backdrop-blur-[60px]" />
      <ShareTopSvg />
      <ShareBottomSvg />
    </div>
  );
};
