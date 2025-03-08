'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * 1. 역스크롤 감지 훅 구현
 * 2. 감지 훅을 써서 특정 뷰 포인트에 접근 했을때, 탭바가 보이면 됌
 * 3. 특정 뷰 포인트라는것은 카드 탭바만 보이는 상황임 뷰에서
 */

export const useScroll = (headerSelector = '.card-detail-header') => {
  const [visible, setVisible] = useState(false);
  const lastScrollYRef = useRef(0);
  const headerVisibleRef = useRef(true);

  const [test, setTest] = useState(false);

  useEffect(() => {
    window.addEventListener('wheel', (event) => {
      console.log(event.deltaY);
      if (event.deltaY < 0) {
        console.log('위로 스크롤 감지');
        setTest(true);
      } else if (event.deltaY > 0) {
        setTest(true);
        // 탭바 숨기기 등 처리
      }
    });
  }, []);

  //   useEffect(() => {
  //     // 초기값 설정
  //     lastScrollYRef.current = window.scrollY;

  //     const checkHeaderVisibility = () => {
  //       const headerElement = document.querySelector(headerSelector);
  //       if (!headerElement) return true; // 헤더가 없으면 true 반환 (기본값)

  //       const headerRect = headerElement.getBoundingClientRect();
  //       // 헤더의 하단 부분이 뷰포트 상단보다 위에 있으면 헤더가 뷰에서 벗어난 것
  //       return headerRect.bottom <= 0;
  //     };

  //     const handleScroll = () => {
  //       const currentScrollY = window.scrollY;
  //       const isHeaderOut = checkHeaderVisibility();

  //       // 헤더가 뷰에서 벗어났을 때만 역스크롤 감지 로직 실행
  //       if (isHeaderOut) {
  //         // 역스크롤(위로 스크롤) 감지
  //         const isScrollingUp = currentScrollY < lastScrollYRef.current;

  //         // 중요: 직접 현재 상태와 비교하지 말고 계산된 값으로 설정
  //         if (isScrollingUp !== visible) {
  //           setVisible(isScrollingUp);
  //         }

  //         // 헤더가 보이지 않음을 기록
  //         headerVisibleRef.current = false;
  //       } else {
  //         // 헤더가 보이는 상태로 전환된 경우
  //         headerVisibleRef.current = true;
  //         // 헤더가 보일 때는 앱바를 보이지 않도록 설정
  //         if (visible) {
  //           setVisible(false);
  //         }
  //       }

  //       // 현재 스크롤 위치를 다음 비교를 위해 저장
  //       lastScrollYRef.current = currentScrollY;
  //     };

  //     // 이벤트 리스너 등록
  //     window.addEventListener('scroll', handleScroll, { passive: true });

  //     // 초기 한 번 실행하여 초기 상태 설정
  //     handleScroll();

  //     // 클린업 함수
  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, [visible, headerSelector]);

  return { visible, test };
};
