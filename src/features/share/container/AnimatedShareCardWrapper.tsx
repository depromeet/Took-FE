'use client';

import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { ShareBackground } from '../components/background/ShareBackground';

import { ShareCardContentContainer } from './ShareCardContentContainer';
import { ShareClipboardContainer } from './ShareClipboardContainer';

function AnimatedShareCardWrapper() {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(true); // 애니메이션 상태를 추적

  useEffect(() => {
    // 페이지 로드 시 애니메이션 시작
    controls
      .start({
        y: 0, // y축 최종 위치: 원래 위치로 이동 (중앙)
        x: 0, // x축 최종 위치: 원래 위치로 이동 (중앙)
        rotate: 0, // 회전 최종 상태: 기울어짐 없이 수평으로
        scale: 1, // 크기 최종 상태: 원래 크기 (100%)
        opacity: 1, // 투명도 최종 상태: 완전히 불투명
        transition: {
          type: 'spring', // 애니메이션 유형: 스프링(탄성) 효과
          damping: 14, // 감쇠: 낮을수록 더 많이 튕김 (진동 감소 속도)
          stiffness: 70, // 강성: 스프링의 강도, 높을수록 빠르게 목표에 도달
          duration: 2, // 애니메이션 총 지속 시간: 2초
        },
      })
      .then(() => {
        // 애니메이션이 완료되면 상태 업데이트
        setIsAnimating(false);
      });
  }, [controls]);

  return (
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
        className="flex h-full w-full flex-col items-center justify-center"
        initial={{
          y: -350, // 더 높은 위치에서 시작
          x: 0,
          rotate: 10, // 비스듬하게 기울어진 상태에서 시작
          opacity: 0,
        }}
        animate={controls}
      >
        <section className="flex h-full w-full flex-col items-center justify-center">
          <ShareCardContentContainer />
          <div className="h-[46px]">
            <ShareClipboardContainer isAnimating={isAnimating} />
          </div>
        </section>
      </motion.div>
    </div>
  );
}

export default AnimatedShareCardWrapper;
