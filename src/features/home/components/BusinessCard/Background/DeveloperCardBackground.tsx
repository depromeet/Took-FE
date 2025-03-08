import { HTMLAttributes } from 'react';

export const DeveloperCardBackground = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="relative" {...props}>
      <div className="bg-[rgba(255,255,255, 0.2)] absolute z-10 h-full w-full backdrop-blur-[57px]" />
      <svg width="270" height="394" viewBox="0 0 270 390" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1388_27751)">
          <rect width="270" height="390" rx="16" fill="white" />
          <path
            d="M26.9933 38.081C106.888 -10.3173 191.444 -22.2816 221.439 27.2334C267.447 103.183 204.577 199.783 124.682 248.181C44.7877 296.58 -77.4189 314.759 -107.414 265.244C-137.409 215.729 -52.9013 86.4793 26.9933 38.081Z"
            fill="#0900FF"
          />
          <path
            d="M84.0469 480.961C35.124 430.899 17.9567 365.407 59.261 325.042C122.617 263.127 212.702 283.873 261.625 333.934C310.547 383.995 336.141 478.368 294.837 518.733C253.532 559.098 132.97 531.022 84.0469 480.961Z"
            fill="#1263FF"
          />
          <path
            d="M-82.2095 141.287C-115.807 72.5688 -118.191 2.16271 -73.6089 -19.6339C-5.2261 -53.067 45.6383 -6.36369 79.2356 62.3548C112.833 131.073 69.2174 250.725 24.6356 272.522C-19.9462 294.319 -48.6122 210.006 -82.2095 141.287Z"
            fill="#00D9FF"
            fillOpacity="0.6"
          />
          <path
            d="M-166.258 287.852C-149.586 225.63 -89.2761 185.731 -9.45766 207.118C112.974 239.924 139.462 303.08 122.79 365.302C106.118 427.524 -60.69 459.844 -140.508 438.457C-220.327 417.069 -182.93 350.074 -166.258 287.852Z"
            fill="#C3D3FF"
            fillOpacity="0.8"
          />
          <path
            d="M-13.3022 295.152C-13.022 214.242 13.6876 146.322 59.3323 146.48C129.346 146.723 168.495 236.789 168.215 317.698C167.935 398.608 129.929 497.171 84.2839 497.013C38.6392 496.855 -13.5824 376.061 -13.3022 295.152Z"
            fill="#8295FF"
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
          <clipPath id="bgblur_1_1388_27751_clip_path" transform="translate(261.259 167.05)">
            <rect x="-105.863" y="-11.6543" width="418.597" height="499.209" />
          </clipPath>
          <clipPath id="clip0_1388_27751">
            <rect width="270" height="390" rx="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
