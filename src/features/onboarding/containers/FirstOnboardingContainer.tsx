import { Background } from '../components/FirstOnboarding/Background';
import { DecoAura } from '../components/FirstOnboarding/DecoAura';
import { DecoCircle } from '../components/FirstOnboarding/DecoCircle';

export const FirstOnboardingContainer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Background />
      <div className="relative">
        <DecoCircle className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
        <DecoAura className="absolute left-[50%] top-[50%] z-[-1] translate-x-[-50%] translate-y-[-50%]" />
      </div>
    </div>
  );
};
