import { DecoAura } from '../components/FirstOnboarding/DecoAura';
import { DecoCircle } from '../components/FirstOnboarding/DecoCircle';
import { TagGroup } from '../components/FirstOnboarding/TagGroup';

export const FirstOnboardingContainer = () => {
  return (
    <div className="flex h-full w-full items-start justify-center">
      <div className="relative flex h-max w-full items-center justify-center pt-[280px]">
        <DecoCircle className="absolute" />
        <DecoAura className="absolute" />
        <TagGroup className="absolute translate-y-[-5%]" />
      </div>
    </div>
  );
};
