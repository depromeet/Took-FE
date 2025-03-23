import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

import { DecoDesignerCard } from './DeveloperCard/DecoDesignerCard';
import { DecoDeveloperCard } from './DeveloperCard/DecoDeveloperCard';

export const DecoCards = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className, 'relative')} {...restProps}>
      <svg width="288" height="174" viewBox="0 0 288 174" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M169.598 115.119C157.891 149.369 125.388 174 87.1246 174C39.007 174 0 135.049 0 87C0 38.9512 39.007 0 87.1246 0C125.388 0 157.891 24.6311 169.598 58.8813V2.98423C188.571 2.98423 206.766 11.8358 220.182 27.5916C233.597 43.3474 241.134 64.7169 241.134 86.9989C241.134 109.281 233.597 130.65 220.182 146.406C206.766 162.162 188.571 171.014 169.598 171.014L169.598 115.119Z"
          fill="white"
          fillOpacity="0.1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M257.059 133.18C264.583 131.629 271.581 127.38 277.056 120.92C284.064 112.65 288.001 101.433 288.001 89.7364C288.001 78.0403 284.064 66.8231 277.056 58.5527C271.581 52.0924 264.583 47.8434 257.059 46.293V133.18Z"
          fill="white"
          fillOpacity="0.1"
        />
      </svg>

      <div className="absolute left-[52px] top-[60px]">
        <div className="absolute left-12 top-[-200px]">
          <div className="rotate-[8deg]">
            <DecoDesignerCard />
          </div>
        </div>
        <div className="absolute top-[-120px]">
          <div className="rotate-[-13deg]">
            <DecoDeveloperCard />
          </div>
        </div>
      </div>
    </div>
  );
};
