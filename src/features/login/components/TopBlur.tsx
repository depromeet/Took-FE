import { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

export const TopBlur = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return (
    <div className={cn(className, 'relative z-[-1] h-full w-full')} {...restProps}>
      <div className="bg-[rgba(255,255,255, 0.2)] absolute top-0 h-dvh w-[600px] backdrop-blur-[70px]" />
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#2A2B38]"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#2A2B38] to-[#000] blur-2xl"></div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-3xl font-bold text-white"></h1>
        </div>
      </div>
    </div>
  );
};
