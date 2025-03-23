import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const DecoDeveloperLogo = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className)} {...restProps}>
      <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.5528 4.92378C38.5528 2.3285 36.4489 0.22461 33.8537 0.22461L17.9302 0.22461C15.3349 0.224609 13.231 2.32851 13.231 4.92379L13.231 15.3421C13.231 17.9374 11.1271 20.0413 8.53181 20.0413L4.71871 20.0413C2.12342 20.0413 0.0195311 22.1452 0.0195311 24.7405L0.019531 34.0582C0.019531 36.6535 2.12343 38.7574 4.71871 38.7574L14.0365 38.7574C16.6318 38.7574 18.7357 36.6535 18.7357 34.0582L18.7357 30.2456C18.7357 27.6503 20.8396 25.5464 23.4348 25.5464L25.8919 25.5464L33.8537 25.5464C36.4489 25.5464 38.5528 23.4426 38.5528 20.8473L38.5528 4.92378Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
