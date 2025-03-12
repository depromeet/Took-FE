'use client';

import React, { useState } from 'react';

import { CardTags, WrappedCard } from '@/features/home/components/BusinessCard/Card';
import { ThumbnailTag } from '@/shared/config';
import { cn } from '@/shared/lib/utils';
import Header from '@/shared/ui/header';
import Thumbnail from '@/shared/ui/thumbnail';

import { SelectedTagType, tagConfig } from './tagFormStep/config/config';

const LAST_NUMBER = 7;

function FourthStep() {
  const [selectedTag, setSelectedTag] = useState<SelectedTagType>('대표 프로젝트');
  const [index, setIndex] = useState<number>(0);

  function handleSelectTag(tagMessage: SelectedTagType) {
    setSelectedTag(tagMessage);
    setIndex(tagConfig.findIndex((index) => index.message === tagMessage));
  }

  return (
    <>
      <Header title={`썸네일 명함에 대표로\n 보여줄 정보를 1개 선택해 주세요`} isFourthStep={true} />
      <section className="relative z-50 -mt-1 h-16 bg-gradient-to-b from-[#14141A] to-[rgba(20,20,26,0)]" />
      <main className="flex flex-col items-center justify-center">
        <WrappedCard
          cardType="designer"
          className="-mt-24 flex h-56 flex-col items-start justify-end gap-2 rounded-none rounded-b-md"
        >
          <CardTags tags={['관심 도메인1', '관심 도메인2']} tagType="designer" />
          <section className="h-4" />
          <Thumbnail
            tag={tagConfig[index].message as ThumbnailTag}
            title={tagConfig[index].title}
            description={tagConfig[index].description}
          />
        </WrappedCard>
        <p className="mt-4 self-start text-caption-1 text-gray-400">
          현재 화면은 예시이며, 홈에서는 직접 입력한 정보가 보여요
        </p>
        <div className="grid-w-full my-6 grid w-full grid-cols-2 gap-2">
          {tagConfig.map((tag) => {
            if (tag.id === LAST_NUMBER) return null;
            return (
              <div
                key={tag.id}
                className={cn(
                  'flex h-10 cursor-pointer items-center justify-center rounded-[6px]',
                  selectedTag === tag.message
                    ? 'border border-primary-normal bg-gray-700 text-white'
                    : 'bg-gray-800 text-gray-600',
                )}
                onClick={() => handleSelectTag(tag.message)}
              >
                <p>{tag.message}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default FourthStep;
