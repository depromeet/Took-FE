import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const ThirdBackground = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className, 'relative z-[-1] h-full w-full')} {...restProps}>
      <div className="bg-[rgba(255,255,255, 0.2)] absolute top-0 h-dvh w-[600px] backdrop-blur-[70px]" />
      <svg width="450" height="538" viewBox="0 0 450 538" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M229.135 142.078C292.818 103.5 361.338 95.8142 387.179 138.473C426.817 203.906 378.375 283.663 314.691 322.241C251.008 360.819 152.003 372.677 126.161 330.018C100.32 287.36 165.451 180.656 229.135 142.078Z"
          fill="#5A23FF"
          fillOpacity="0.6"
        />
        <path
          d="M100.499 199.215C66.376 129.422 60.8712 59.4218 100.834 39.8835C162.132 9.9143 211.094 58.6673 245.217 128.461C279.34 198.254 244.87 314.973 204.907 334.512C164.945 354.05 134.622 269.009 100.499 199.215Z"
          fill="#0073FF"
          fillOpacity="0.4"
        />
        <path
          d="M33.7932 348.254C48.7382 292.478 102.799 256.713 174.348 275.885C284.094 305.291 307.838 361.904 292.893 417.679C277.948 473.455 128.423 502.426 56.8749 483.254C-14.6736 464.083 18.8482 404.029 33.7932 348.254Z"
          fill="#C3D3FF"
          fillOpacity="0.4"
        />
      </svg>

      <div className="w-full">
        <svg width="606" height="366" viewBox="0 0 606 366" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="606" height="365" fill="url(#paint0_linear_6517_1038)" fillOpacity="0.25" />
          <rect y="118.201" width="606" height="247" fill="url(#paint1_linear_6517_1038)" fillOpacity="0.3" />
          <rect y="20" width="606" height="345" fill="url(#paint2_linear_6517_1038)" fillOpacity="0.25" />
          <defs>
            <linearGradient
              id="paint0_linear_6517_1038"
              x1="303"
              y1="47.1679"
              x2="303"
              y2="365"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2370FF" stopOpacity="0" />
              <stop offset="1" stopColor="#7023FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_6517_1038"
              x1="291.633"
              y1="118.201"
              x2="291.633"
              y2="304.823"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B682FF" stopOpacity="0" />
              <stop offset="1" stopColor="#B682FF" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_6517_1038"
              x1="303"
              y1="64.5833"
              x2="303"
              y2="365"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2370FF" stopOpacity="0" />
              <stop offset="1" stopColor="#7023FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
