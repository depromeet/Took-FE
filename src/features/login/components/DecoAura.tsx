import { SVGProps } from 'react';

import { cn } from '@/shared/lib/utils';

export const DecoAura = (props: SVGProps<SVGSVGElement>) => {
  const { className, ...restProps } = props;

  return (
    <svg
      className={cn(className)}
      width="550"
      height="551"
      viewBox="0 0 550 551"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g opacity="0.4" filter="url(#filter0_di_6472_1093)">
        <circle cx="275" cy="275.553" r="262" fill="#6C4BFF" fillOpacity="0.04" shapeRendering="crispEdges" />
      </g>
      <g opacity="0.6" filter="url(#filter1_di_6472_1093)">
        <circle cx="275.001" cy="275.554" r="152.745" fill="#6C4BFF" fillOpacity="0.08" shapeRendering="crispEdges" />
      </g>
      <defs>
        <filter
          id="filter0_di_6472_1093"
          x="0.377329"
          y="0.930063"
          width="549.245"
          height="549.245"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6.31134" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.402214 0 0 0 0 0.268018 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6472_1093" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6472_1093" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="28.9049" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.81654 0 0 0 0 0.763949 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_6472_1093" />
        </filter>
        <filter
          id="filter1_di_6472_1093"
          x="109.633"
          y="110.186"
          width="330.736"
          height="330.736"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6.31134" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.402214 0 0 0 0 0.268018 0 0 0 0 1 0 0 0 0.3 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6472_1093" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6472_1093" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="28.9049" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.81654 0 0 0 0 0.763949 0 0 0 0 1 0 0 0 0.3 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_6472_1093" />
        </filter>
      </defs>
    </svg>
  );
};
