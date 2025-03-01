'use client';

import OnboardingCarousel from './OnboardingCarousel';
import { OnboardingHeader } from './OnboardingHeader';

interface OnboardingFeatureProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingFeature({ onComplete, onSkip }: OnboardingFeatureProps) {
  return (
    <div className="flex h-full w-full max-w-[600px] flex-col">
      <OnboardingHeader onSkip={onSkip} />
      <OnboardingCarousel onComplete={onComplete} />
    </div>
  );
}
