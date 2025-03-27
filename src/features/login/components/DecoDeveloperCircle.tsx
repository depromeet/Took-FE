import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const DecoDeveloperCircle = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className)} {...restProps}>
      <div className="bg-[rgba(255,255,255, 0.2)] absolute top-0 h-[144px] w-[144px] rounded-full backdrop-blur-[14px]" />
      <svg width="144" height="144" viewBox="0 0 161 161" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.4" filter="url(#filter0_i_6472_971)">
          <g clipPath="url(#clip0_6472_971)">
            <rect
              data-figma-bg-blur-radius="28.0761"
              x="-34.9102"
              y="176.479"
              width="310.441"
              height="651.365"
              transform="rotate(-97.565 -34.9102 176.479)"
              fill="#6D61FF"
            />
            <path
              d="M44.4692 98.5651C27.8025 77.8148 22.6317 53.2729 37.8712 41.0325C61.2466 22.2574 92.946 34.7389 109.613 55.4891C126.279 76.2394 134.034 111.651 118.795 123.891C103.555 136.132 61.1358 119.315 44.4692 98.5651Z"
              fill="#2395FF"
            />
            <path
              d="M96.7751 143.001C77.4959 155.819 55.6558 158.12 45.9416 143.51C31.0414 121.1 42.3179 102.911 61.5971 90.0926C80.8763 77.274 121.098 89.4793 130.812 104.089C140.527 118.7 116.054 130.182 96.7751 143.001Z"
              fill="#0008E2"
              fillOpacity="0.4"
            />
            <path
              opacity="0.9"
              d="M128.744 140.101C113.744 138.143 102.591 125.337 105.102 106.095C108.954 76.58 122.837 68.4611 137.837 70.4186C152.837 72.3761 165.518 110.208 163.007 129.45C160.496 148.692 143.744 142.058 128.744 140.101Z"
              fill="#C3D3FF"
              fillOpacity="0.9"
            />
            <path
              opacity="0.9"
              d="M87.6302 182.294C79.1006 169.801 81.2261 152.953 97.2526 142.011C121.835 125.228 137.137 130.177 145.667 142.671C154.197 155.164 134.42 189.819 118.394 200.761C102.367 211.702 96.1598 194.787 87.6302 182.294Z"
              fill="#C3D3FF"
              fillOpacity="0.5"
            />
            <path
              d="M126.895 88.3427C108.052 90.7789 91.4148 86.661 90.0404 76.0304C87.9324 59.7245 107.688 47.8265 126.532 45.3903C145.376 42.9541 169.495 48.7543 170.87 59.3848C172.244 70.0154 145.739 85.9065 126.895 88.3427Z"
              fill="#A882FF"
              fillOpacity="0.6"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_i_6472_971"
            x="0"
            y="0.103516"
            width="160.344"
            height="160.342"
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
            <feGaussianBlur stdDeviation="8.14206" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
            <feBlend mode="plus-lighter" in2="shape" result="effect1_innerShadow_6472_971" />
          </filter>
          <clipPath id="bgblur_1_6472_971_clip_path" transform="translate(103.855 245.09)">
            <rect
              x="-34.9102"
              y="176.479"
              width="310.441"
              height="651.365"
              transform="rotate(-97.565 -34.9102 176.479)"
            />
          </clipPath>
          <clipPath id="clip0_6472_971">
            <rect
              x="18.7988"
              y="160.445"
              width="142.787"
              height="142.787"
              rx="71.3935"
              transform="rotate(-97.565 18.7988 160.445)"
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
