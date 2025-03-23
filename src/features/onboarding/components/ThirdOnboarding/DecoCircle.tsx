import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const DecoCircle = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className)} {...restProps}>
      <svg width="773" height="506" viewBox="0 0 773 506" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity="0.3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M754.172 506C766.394 468.369 773 428.206 773 386.5C773 173.042 599.958 0 386.5 0C173.042 0 0 173.042 0 386.5C0 428.206 6.60574 468.369 18.828 506H754.172Z"
          fill="url(#paint0_radial_6517_1035)"
          fillOpacity="0.2"
        />
        <path
          opacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M600.898 506C608.104 483.968 612 460.439 612 436C612 311.736 511.264 211 387 211C262.736 211 162 311.736 162 436C162 460.439 165.896 483.968 173.102 506H600.898Z"
          fill="url(#paint1_radial_6517_1035)"
          fillOpacity="0.3"
        />
        <path
          opacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M229.242 506H543.758C533.953 427.628 467.285 367 386.5 367C305.716 367 239.047 427.628 229.242 506Z"
          fill="url(#paint2_radial_6517_1035)"
          fillOpacity="0.3"
        />
        <defs>
          <radialGradient
            id="paint0_radial_6517_1035"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(386.5 386.5) rotate(90) scale(386.5 386.5)"
          >
            <stop offset="0.860977" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_6517_1035"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(387 436) rotate(90) scale(225 225)"
          >
            <stop offset="0.855977" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_6517_1035"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(386.5 526) rotate(90) scale(159 158.5)"
          >
            <stop offset="0.666879" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
