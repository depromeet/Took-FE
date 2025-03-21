import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const DecoCircle = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className)} {...restProps}>
      <div className="bg-[rgba(255,255,255, 0.2)] absolute top-0 h-[221px] w-[220px] rounded-full backdrop-blur-[16px]" />
      <svg width="220" height="221" viewBox="0 0 220 221" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_6472_1001)">
          <g clipPath="url(#clip0_6472_1001)">
            <foreignObject x="-56.8537" y="-127.717" width="564.827" height="1090.1"></foreignObject>
            <rect
              data-figma-bg-blur-radius="43.258"
              x="-13.5957"
              y="-84.459"
              width="478.31"
              height="1003.59"
              fill="#6D61FF"
            />
            <path
              d="M100.935 68.0509C133.52 48.3113 168.581 44.3785 181.803 66.2061C202.085 99.6867 177.298 140.497 144.713 160.237C112.127 179.976 61.4682 186.044 48.2456 164.216C35.023 142.388 68.3493 87.7904 100.935 68.0509Z"
              fill="#5A23FF"
            />
            <path
              d="M15.7033 111.443C0.0356814 79.3971 -1.07602 46.5643 19.7141 36.3997C51.6034 20.8087 75.3232 42.5881 90.9908 74.634C106.658 106.68 86.319 162.478 65.5289 172.642C44.7389 182.807 31.3709 143.489 15.7033 111.443Z"
              fill="#0073FF"
              fillOpacity="0.4"
            />
            <path
              d="M18.5836 168.496C24.616 145.983 46.4372 131.547 75.317 139.285C119.615 151.155 129.199 174.006 123.167 196.519C117.134 219.032 56.7802 230.726 27.9003 222.988C-0.97953 215.249 12.5512 191.009 18.5836 168.496Z"
              fill="#C3D3FF"
              fillOpacity="0.8"
            />
            <path
              d="M88.1991 180.55C88.3005 151.275 97.9645 126.7 114.48 126.757C139.812 126.845 153.977 159.433 153.875 188.707C153.774 217.982 140.023 253.644 123.508 253.587C106.992 253.53 88.0977 209.824 88.1991 180.55Z"
              fill="#B682FF"
              fillOpacity="0.6"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_i_6472_1001"
            x="0"
            y="0.820312"
            width="219.998"
            height="219.998"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="12.5448" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
            <feBlend mode="plus-lighter" in2="shape" result="effect1_innerShadow_6472_1001" />
          </filter>
          <clipPath id="bgblur_1_6472_1001_clip_path" transform="translate(56.8537 127.717)">
            <rect x="-13.5957" y="-84.459" width="478.31" height="1003.59" />
          </clipPath>
          <clipPath id="clip0_6472_1001">
            <rect y="0.820312" width="219.998" height="219.998" rx="109.999" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
