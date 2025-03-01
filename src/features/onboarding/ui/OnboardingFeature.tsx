'use client';

import OnboardingCarousel from './OnboardingCarousel';
import { OnboardingHeader } from './OnboardingHeader';

/**
 * OnboardingFeatureProps 설명
 * onComplete , onSkip은 showOnboarding 상태를 false로 바구는 함수입니다.
 * 헤더의 건너뛰기 , 모든 온보딩 페이지를 다 확인했을 때 사용합니다.
 * onSkip = 건너뛰기 누를 때 사용
 * onComplete = 온보딩 마지막 페이지에서 사용
 */

interface OnboardingFeatureProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingFeature({ onComplete, onSkip }: OnboardingFeatureProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <OnboardingHeader onSkip={onSkip} />
      <OnboardingCarousel onComplete={onComplete} />
    </div>
  );
}
