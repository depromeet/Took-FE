import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

type Props = {
  jobType: 'DESIGNER' | 'DEVELOPER';
} & HTMLAttributes<HTMLDivElement>;

export const Background = ({ jobType, className, ...restProps }: Props) => {
  return (
    <div className={cn(className, 'relative z-[-1] h-full w-full overflow-hidden bg-white')} {...restProps}>
      <div className="bg-[rgba(255,255,255, 0.2)] absolute top-0 h-dvh w-full backdrop-blur-[80px]" />
      <svg
        className="absolute left-[-50%] top-[-32%] z-[-1]"
        width="1003"
        height="1036"
        viewBox="0 0 1003 1036"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M620.112 807.338C466.531 931.196 288.274 974.353 203.516 869.257C73.5096 708.052 170.937 479.528 324.518 355.67C478.099 231.812 735.375 167.45 820.133 272.546C904.89 377.643 773.693 683.479 620.112 807.338Z"
          fill={jobType === 'DEVELOPER' ? '#233DFF' : '#5423FF'}
        />
        <path
          d="M657.389 521.799C737.836 614.164 764.168 727.769 692.977 789.773C583.78 884.88 480.031 838.702 399.584 746.336C319.137 653.97 357.839 432.681 429.029 370.676C500.22 308.672 576.942 429.433 657.389 521.799Z"
          fill={jobType === 'DEVELOPER' ? '#00AEFF' : '#0066FF'}
          fillOpacity="0.7"
        />
        <path
          d="M738.711 467.04C738.711 588.61 648.26 690.8 492.311 690.8C253.105 690.8 173.969 588.61 173.969 467.04C173.969 345.47 462.259 205.077 618.209 205.077C774.158 205.077 738.711 345.47 738.711 467.04Z"
          fill={jobType === 'DEVELOPER' ? '#AFADFF' : '#D0C3FF'}
          fillOpacity="0.8"
        />
        <path
          d="M475.732 368.086C514.741 515.715 499.227 652.574 415.943 674.581C288.196 708.337 172.838 563.277 133.828 415.648C94.8185 268.02 115.957 69.7821 199.241 47.7751C282.525 25.768 436.722 220.458 475.732 368.086Z"
          fill={jobType === 'DEVELOPER' ? '#CFDCFE' : '#B682FF'}
          fillOpacity="0.6"
        />
      </svg>
    </div>
  );
};
