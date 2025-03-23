import { SVGProps } from 'react';

import { cn } from '@/shared/lib/utils';

export const DecoAura = (props: SVGProps<SVGSVGElement>) => {
  const { className, ...restProps } = props;

  return (
    <svg
      className={cn(className)}
      width="529"
      height="529"
      viewBox="0 0 529 529"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g opacity="0.4" filter="url(#filter0_di_6472_998)">
        <circle cx="264.818" cy="264.818" r="251.818" fill="#6C4BFF" fillOpacity="0.04" shapeRendering="crispEdges" />
      </g>
      <g opacity="0.6" filter="url(#filter1_di_6472_998)">
        <circle cx="264.817" cy="264.817" r="164" fill="#6C4BFF" fillOpacity="0.08" shapeRendering="crispEdges" />
      </g>
      <defs>
        <filter
          id="filter0_di_6472_998"
          x="0.867884"
          y="0.867884"
          width="527.901"
          height="527.901"
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
          <feGaussianBlur stdDeviation="6.06606" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.402214 0 0 0 0 0.268018 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6472_998" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6472_998" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="27.7815" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.81654 0 0 0 0 0.763949 0 0 0 0 1 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_6472_998" />
        </filter>
        <filter
          id="filter1_di_6472_998"
          x="87.2636"
          y="87.2636"
          width="355.106"
          height="355.106"
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
          <feGaussianBlur stdDeviation="6.7764" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.402214 0 0 0 0 0.268018 0 0 0 0 1 0 0 0 0.3 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6472_998" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6472_998" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="31.0348" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.81654 0 0 0 0 0.763949 0 0 0 0 1 0 0 0 0.3 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_6472_998" />
        </filter>
      </defs>
    </svg>
  );
};
