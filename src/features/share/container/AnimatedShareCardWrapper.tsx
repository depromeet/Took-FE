'use client';

import { motion, useAnimation } from 'framer-motion';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Toast from '@/shared/ui/Toast';

import { ShareBackground } from '../components/background/ShareBackground';
import { useCardQuery } from '../hooks/queries/useCardQuery';
import { useCardDetail } from '../hooks/useCardDetail';
import { useCardShareAutoAction } from '../hooks/useCardShareAutoAction';
import { Card } from '../types';

import { OpenShareCardDetailContainer } from './OpenShareCardDetailContainer';
import { ShareCardContentContainer } from './ShareCardContentContainer';

function AnimatedShareCardWrapper() {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(true);
  const { id } = useParams();
  const { data } = useCardQuery(id as string);
  const cardData = data?.data;

  // 페이지 로드 시 자동 동작
  useCardShareAutoAction(id as string);

  const { handleMoveToDetail } = useCardDetail(id as string); // 카드 클릭 시 동작 - 상세 페이지로 이동

  useEffect(() => {
    // 애니메이션 효과 설정
    controls
      .start({
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          damping: 14,
          stiffness: 70,
          duration: 2,
        },
      })
      .then(() => {
        setIsAnimating(false);
      });
  }, [controls]);

  return (
    <>
      <div className="relative h-full w-full">
        <ShareBackground className="absolute z-[-10]" />

        {isAnimating && (
          <>
            {/* 전체 배경 오버레이 */}
            <div className="absolute inset-0 z-[-5] bg-white opacity-5 transition-opacity duration-500" />

            {/* 왼쪽 그라데이션 */}
            <div className="absolute left-0 top-0 z-[-5] h-full w-[18%] bg-gradient-to-r from-white to-transparent opacity-10 transition-opacity duration-500" />

            {/* 오른쪽 그라데이션 */}
            <div className="absolute right-0 top-0 z-[-5] h-full w-[18%] bg-gradient-to-l from-white to-transparent opacity-10 transition-opacity duration-500" />
          </>
        )}

        <motion.div
          className="mx-auto flex h-full w-full flex-col items-center justify-center"
          initial={{
            y: -350, // 더 높은 위치에서 시작
            x: 0,
            rotate: 10, // 비스듬하게 기울어진 상태에서 시작
            opacity: 0,
          }}
          animate={controls}
        >
          <section className="flex flex-col items-center justify-center" onClick={handleMoveToDetail}>
            <ShareCardContentContainer cardData={cardData as Card} />
            <div className="h-[46px]">
              <OpenShareCardDetailContainer isAnimating={isAnimating} cardData={cardData as Card} />
            </div>
          </section>
        </motion.div>
      </div>
      <Toast />
    </>
  );
}

export default AnimatedShareCardWrapper;
