import { SVGProps } from 'react';

export const CardPlusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="34" height="34" rx="17" fill="#14141A" />
      <path d="M10 17H24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 10L17 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
