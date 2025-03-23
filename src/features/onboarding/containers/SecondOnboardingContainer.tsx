import { DecoCard } from '../components/SecondOnboarding/DecoCard';
import { DecoCircle } from '../components/SecondOnboarding/DecoCircle';

export const SecondOnboardingContainer = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="flex h-max w-full items-center justify-center pt-[256px]">
        <DecoCircle className="absolute bottom-[0px]" />
        <DecoCard className="absolute" />
      </div>
    </div>
  );
};
