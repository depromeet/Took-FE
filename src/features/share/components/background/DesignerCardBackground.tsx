import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const DesignerCardBackground = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="relative" {...props}>
      {/* 애니메이션 중일 때 회색 배경 추가 */}
      {/* {isAnimating && <div className="absolute z-0 h-full w-full rounded-2xl bg-gray-200"></div>} */}

      <div className={cn('absolute z-10 h-full w-full', 'bg-[rgba(255,255,255, 0.2)] backdrop-blur-[57px]')} />

      {/* 애니메이션 중에는 SVG 숨기기 */}
      <div>
        <svg width="270" height="394" viewBox="0 0 270 390" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1399_27916)">
            <rect width="270" height="390" rx="16" fill="white" />
            <path
              d="M142.116 463.738C104.565 425.314 88.6666 377.705 115.677 351.308C157.108 310.82 222.196 330.708 259.747 369.132C297.297 407.556 320.814 476.208 293.803 502.604C266.792 529.001 179.666 502.163 142.116 463.738Z"
              fill="#5420FF"
            />
            <path
              d="M-68.0021 150.161C-101.394 81.8623 -103.764 11.8859 -59.454 -9.77772C8.51153 -43.0069 59.0655 3.41149 92.4578 71.7106C125.85 140.01 82.5008 258.932 38.191 280.595C-6.11874 302.259 -34.6098 218.461 -68.0021 150.161Z"
              fill="#0073FF"
              fillOpacity="0.6"
            />
            <path
              d="M45.9595 68.4407C128.322 36.0184 208.149 35.6778 226.415 82.0798C254.434 153.254 178.681 229.406 96.3191 261.829C13.9569 294.251 -101.582 295.511 -119.848 249.109C-138.114 202.707 -36.4028 100.863 45.9595 68.4407Z"
              fill="#4711F2"
            />
            <path
              d="M-151.532 295.832C-134.961 233.99 -75.0196 194.335 4.31179 215.591C125.996 248.197 152.323 310.967 135.753 372.81C119.182 434.653 -46.608 466.775 -125.939 445.518C-205.271 424.261 -168.102 357.675 -151.532 295.832Z"
              fill="#C3D3FF"
              fillOpacity="0.8"
            />
            <path
              d="M-5.30646 330.013C-5.028 249.597 21.5186 182.091 66.8848 182.248C136.471 182.489 175.381 272.006 175.103 352.421C174.824 432.837 137.05 530.799 91.6842 530.642C46.318 530.485 -5.58492 410.428 -5.30646 330.013Z"
              fill="#B682FF"
              fillOpacity="0.6"
            />
            <foreignObject x="-261.259" y="-167.05" width="729.389" height="810"></foreignObject>
            <rect
              data-figma-bg-blur-radius="155.396"
              x="-105.863"
              y="-11.6543"
              width="418.597"
              height="499.209"
              fill="white"
              fillOpacity="0.02"
            />
          </g>
          <defs>
            <clipPath id="bgblur_1_1399_27916_clip_path" transform="translate(261.259 167.05)">
              <rect x="-105.863" y="-11.6543" width="418.597" height="499.209" />
            </clipPath>
            <clipPath id="clip0_1399_27916">
              <rect width="270" height="390" rx="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};
