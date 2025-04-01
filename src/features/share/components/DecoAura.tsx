import { SVGProps } from 'react';

import { cn } from '@/shared/lib/utils';

export const DecoAura = (props: SVGProps<SVGSVGElement>) => {
  const { className, ...restProps } = props;

  return (
    <svg
      className={cn('absolute z-[-1]', className)}
      width="657"
      height="658"
      viewBox="0 0 657 658"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <circle cx="328.5" cy="328.889" r="328.5" fill="url(#paint0_radial_6677_1326)" fillOpacity="0.2" />
      <circle cx="328.5" cy="419.889" r="217.5" fill="url(#paint1_radial_6677_1326)" fillOpacity="0.3" />
      <defs>
        <radialGradient
          id="paint0_radial_6677_1326"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(328.5 328.889) rotate(90) scale(328.5)"
        >
          <stop offset="0.845977" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_6677_1326"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(328.5 419.889) rotate(90) scale(217.5)"
        >
          <stop offset="0.735977" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
      </defs>
    </svg>
  );
};
