'use client';

import { useState } from 'react';

import OnboardingScreen from '@/features/onboarding/screen';

export default function LoginPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return <OnboardingScreen />;
}
