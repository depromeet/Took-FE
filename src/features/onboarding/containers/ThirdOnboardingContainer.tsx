import { DecoCards } from '../components/ThirdOnboarding/DecoCards';
import { DecoCircle } from '../components/ThirdOnboarding/DecoCircle';

export const ThirdOnboardingContainer = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="flex h-max w-full items-center justify-center pt-[256px]">
        <DecoCircle className="absolute bottom-[0px]" />
        <DecoCards className="absolute" />
      </div>
    </div>
  );
};
