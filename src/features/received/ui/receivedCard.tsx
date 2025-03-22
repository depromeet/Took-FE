import Image from 'next/image';
import React from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import WrappedAvatar from '@/shared/ui/Avatar';
import Tag from '@/shared/ui/tag/tag';
import Thumbnail from '@/shared/ui/thumbnail';

export default function ReceivedCard() {
  return (
    <div
      className={cn(
        'flex h-auto w-auto flex-col justify-center rounded-2xl bg-gray-800',
        spacingStyles({ marginX: 'ml', paddingX: 'ml', paddingY: 'ml' }),
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <WrappedAvatar size="medium" />
          <div className="flex flex-col items-start">
            <div className="flex w-36 items-center justify-start gap-2 text-white">
              <p className="text-title-2">김디퍼</p>
              <p className="text-caption-1">디프만</p>
            </div>
            <p className="text-body-3 text-white">Frontend Developer</p>
          </div>
        </div>
        <Image src="/icons/developer-icon-white.svg" alt="icon" width={16} height={16} className="self-start" />
      </div>
      <p className={cn('text-body-5 text-white', spacingStyles({ marginTop: 'md', marginBottom: 'lg' }))}>
        안녕하세요 저는 무엇을 원하는 개발자입니다
      </p>
      <div className={cn('flex gap-1', spacingStyles({ marginBottom: 'md' }))}>
        <Tag size="sm" message="SaaS" className="bg-opacity-white-10 text-white" />
        <Tag size="sm" message="스타트업" className="bg-opacity-white-10 text-white" />
        <Tag size="sm" message="스타트업" className="bg-opacity-white-10 text-white" />
      </div>
      <Thumbnail
        tag="대표 프로젝트"
        title="프로젝트 제목"
        description="김디퍼님의 프로젝트 링크"
        className="!w-auto !bg-gray-700"
      />
    </div>
  );
}
