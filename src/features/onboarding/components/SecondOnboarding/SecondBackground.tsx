import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const SecondBackground = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className, 'relative z-[-1] h-full w-full')} {...restProps}>
      <div className="bg-[rgba(255,255,255, 0.2)] absolute top-0 h-dvh w-[600px] backdrop-blur-[70px]" />
      <svg width="540" height="685" viewBox="0 0 540 685" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M411.738 583.719C360.241 637.365 295.635 662.046 258.879 626.85C202.501 572.863 227.962 482.81 279.459 429.164C330.955 375.518 424.101 339.122 460.857 374.318C497.613 409.514 463.235 530.073 411.738 583.719Z"
          fill="#5423FF"
          fillOpacity="0.4"
        />
        <path
          d="M268.767 458.637C314.979 511.63 330.106 576.809 289.211 612.382C226.483 666.948 166.886 640.454 120.673 587.461C74.4612 534.468 96.693 407.507 137.588 371.933C178.483 336.36 222.555 405.644 268.767 458.637Z"
          fill="#0066FF"
          fillOpacity="0.2"
        />
        <path
          d="M246.147 210.961C268.556 295.66 259.644 374.18 211.802 386.806C138.419 406.173 72.1519 322.947 49.7431 238.248C27.3344 153.549 39.477 39.8139 87.3189 27.1877C135.161 14.5616 223.738 126.261 246.147 210.961Z"
          fill="#B682FF"
          fillOpacity="0.2"
        />
      </svg>

      <div>
        <svg width="407" height="368" viewBox="0 0 407 368" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="406.64" height="367.105" fill="url(#paint0_linear_6472_1470)" fillOpacity="0.25" />
          <defs>
            <linearGradient
              id="paint0_linear_6472_1470"
              x1="203.32"
              y1="47.4399"
              x2="203.32"
              y2="367.105"
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
