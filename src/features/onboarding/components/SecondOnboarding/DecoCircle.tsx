import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const DecoCircle = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className)} {...restProps}>
      <svg width="951" height="551" viewBox="0 0 732 424" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity="0.3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M727.43 424C730.438 405.109 732 385.737 732 366C732 163.864 568.136 0 366 0C163.864 0 0 163.864 0 366C0 385.737 1.5623 405.109 4.57 424H727.43Z"
          fill="url(#paint0_radial_6515_1021)"
          fillOpacity="0.15"
        />
        <path
          opacity="0.3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M658.04 424H68.9609C101.819 291.895 221.228 194 363.5 194C505.773 194 625.181 291.895 658.04 424Z"
          fill="url(#paint1_radial_6515_1021)"
          fillOpacity="0.2"
        />
        <defs>
          <radialGradient
            id="paint0_radial_6515_1021"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(366 366) rotate(90) scale(366 366)"
          >
            <stop offset="0.845977" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_6515_1021"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(363.5 497.5) rotate(90) scale(303.5 303.5)"
          >
            <stop offset="0.775977" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
