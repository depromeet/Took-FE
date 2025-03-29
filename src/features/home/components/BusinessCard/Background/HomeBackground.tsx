import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const HomeBackground = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn('relative h-dvh w-full', className)}>
      <div className="bg-[rgba(255,255,255, 0.2)] absolute h-full w-full backdrop-blur-[68px]" />
      <svg
        className="ml-[44px] mt-[88px]"
        width="340"
        height="354"
        viewBox="0 0 340 354"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M167.019 103.077C227.057 66.7077 291.654 59.4617 316.016 99.678C353.384 161.365 307.715 236.556 247.678 272.925C187.64 309.295 94.3037 320.473 69.9416 280.257C45.5795 240.041 106.982 139.446 167.019 103.077Z"
          fill="#5A23FF"
          fillOpacity="0.8"
        />
        <path
          opacity="0.7"
          d="M53.8871 173.59C25.495 115.518 23.4804 56.0203 61.1553 37.6006C118.944 9.34721 161.928 48.8149 190.32 106.887C218.712 164.959 181.854 266.073 144.179 284.493C106.504 302.913 82.2792 231.662 53.8871 173.59Z"
          fill="#0073FF"
          fillOpacity="0.6"
        />
      </svg>

      <svg
        className="absolute bottom-0"
        width="600"
        height="319"
        viewBox="0 0 600 319"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="600" height="319" fill="url(#paint0_linear_2559_11289)" fillOpacity="0.5" />
        <defs>
          <linearGradient
            id="paint0_linear_2559_11289"
            x1="300"
            y1="41.2234"
            x2="300"
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
