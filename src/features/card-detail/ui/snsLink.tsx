import Image from 'next/image';
import React from 'react';

import { spacingStyles } from '@/shared/spacing';

import { SNSLinkDto } from '../types/sample';

interface SNSLinksProps {
  data: SNSLinkDto[];
}

function SNSLinks({ data }: SNSLinksProps) {
  return (
    <div className={`flex flex-wrap gap-8 ${spacingStyles({ marginTop: 'ms' })}`}>
      {data.map((e, i) => {
        return (
          <div className="flex flex-col items-center" key={i}>
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-opacity-purple-30">
              <Image src="/icons/design-icon-white.svg" alt="디자인 로고" width={28} height={28} />
            </div>

            <span>{e.type}</span>
          </div>
        );
      })}
    </div>
  );
}

export default SNSLinks;
