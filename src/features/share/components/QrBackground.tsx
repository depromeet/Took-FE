import { SVGProps } from 'react';

import { cn } from '@/shared/lib/utils';

export const QrBackground = (props: SVGProps<SVGSVGElement>) => {
  const { className, ...restProps } = props;

  return (
    <svg
      className={cn(className)}
      width="260"
      height="325"
      viewBox="0 0 260 325"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clipPath="url(#clip0_6678_1329)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 11C0 4.37258 5.37258 -1 12 -1H248C254.627 -1 260 4.37258 260 11V63C260 63 260 63 260 63C254.606 63 250.234 67.3721 250.234 72.7653C250.234 78.1585 254.606 82.5305 260 82.5305C260 82.5305 260 82.5305 260 82.5305V313C260 319.627 254.627 325 248 325H12C5.37258 325 0 319.627 0 313V82.455C0.399777 82.5048 0.807058 82.5305 1.22034 82.5305C6.61354 82.5305 10.9856 78.1585 10.9856 72.7653C10.9856 67.3721 6.61354 63 1.22034 63C0.807058 63 0.399777 63.0257 0 63.0755V11Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_6678_1329">
          <rect width="260" height="325" rx="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
