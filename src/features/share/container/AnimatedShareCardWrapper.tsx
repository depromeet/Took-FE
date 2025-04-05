'use client';

import { motion, useAnimation } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useIsLoggedIn } from '@/shared/hooks/useIsLoggedIn';
import Toast from '@/shared/ui/Toast';
import handleAxiosError from '@/shared/utils/handleAxiosError';

import { ShareBackground } from '../components/background/ShareBackground';
import { useSaveCard } from '../hooks/mutations/useSaveCard';
import { useCardQuery } from '../hooks/queries/useCardQuery';
import { useShareStore } from '../store/shareStore';
import { Card } from '../types';

import { OpenShareCardDetailContainer } from './OpenShareCardDetailContainer';
import { ShareCardContentContainer } from './ShareCardContentContainer';

function AnimatedShareCardWrapper() {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(true);
  const { id } = useParams();
  const { data } = useCardQuery(id as string);
  const setFromSharedCard = useShareStore((state) => state.setFromSharedCard);
  const { mutate: saveCard } = useSaveCard();
  const { isLoggedIn } = useIsLoggedIn();
  const router = useRouter();

  const cardData = data?.data;

  useEffect(() => {
    // 명함 공유 페이지에서 접근했음을 표시
    setFromSharedCard(true);

    // 로그인한 사용자만 명함을 저장
    if (isLoggedIn) {
      handleSaveCard();
    }

    // 페이지 로드 시 애니메이션 시작
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
  }, [controls, setFromSharedCard, isLoggedIn]);

  const handleSaveCard = () => {
    if (!id) return;

    saveCard(id as string, {
      onSuccess: () => {
        toast.success('명함이 저장되었습니다.');
      },
      onError: (error) => {
        handleAxiosError(error);
      },
    });
  };

  const handleMoveToDetail = () => {
    router.push(`/card-detail/${id}?type=receivedcard`);
  };

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
