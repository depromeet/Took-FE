'use client';

import { useState } from 'react';

import { LoginFeature } from '@/features/auth/login/ui/LoginFeature';
import { OnboardingFeature } from '@/features/onboarding/ui/OnboardingFeature';

export default function LoginPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="flex h-dvh w-full justify-center">
      <div
        className="h-full w-full max-w-[600px] flex-col items-center justify-center bg-black"
        style={{
          backgroundImage: `url(${'/images/login/onboarding/onboarding-bg.png'})`,
          backgroundSize: 'contain',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {showOnboarding ? (
          <OnboardingFeature onComplete={handleOnboardingComplete} onSkip={handleSkipOnboarding} />
        ) : (
          <LoginFeature />
        )}
      </div>
    </div>
  );
}
