import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const Background = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className, 'relative z-[-1] h-full w-full')} {...restProps}>
      <div className="bg-[rgba(255,255,255, 0.2)] absolute top-0 h-dvh w-[600px] backdrop-blur-[70px]" />
      <svg width="479" height="538" viewBox="0 0 479 538" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M244.002 116.429C311.817 75.3484 384.783 67.1636 412.302 112.59C454.511 182.269 402.926 267.201 335.11 308.283C267.294 349.364 161.865 361.991 134.347 316.564C106.829 271.137 176.186 157.511 244.002 116.429Z"
          fill="#5A23FF"
          fillOpacity="0.6"
        />
        <path
          d="M116.211 196.08C84.1408 130.484 81.8652 63.2779 124.421 42.4719C189.696 10.5582 238.249 55.139 270.319 120.735C302.39 186.33 260.756 300.544 218.201 321.35C175.645 342.156 148.282 261.675 116.211 196.08Z"
          fill="#0073FF"
          fillOpacity="0.4"
        />
        <path
          d="M35.985 335.983C51.8997 276.588 109.468 238.503 185.659 258.918C302.527 290.233 327.812 350.519 311.897 409.913C295.982 469.308 136.755 500.158 60.5644 479.743C-15.6266 459.328 20.0703 395.377 35.985 335.983Z"
          fill="#C3D3FF"
          fillOpacity="0.4"
        />
      </svg>

      <div className="absolute bottom-0 w-full">
        <svg width="600" height="319" viewBox="0 0 600 319" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="319" fill="url(#paint0_linear_6529_1061)" fillOpacity="0.5" />
          <rect y="123" width="600" height="196" fill="url(#paint1_linear_6529_1061)" />
          <defs>
            <linearGradient
              id="paint0_linear_6529_1061"
              x1="300"
              y1="41.2234"
              x2="300"
              y2="319"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2370FF" stopOpacity="0" />
              <stop offset="1" stopColor="#7023FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_6529_1061"
              x1="300"
              y1="123"
              x2="300"
              y2="319"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2900B8" stopOpacity="0" />
              <stop offset="1" stopColor="#341C88" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
