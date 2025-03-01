import { Typography } from '@/shared/ui/typography';

interface OnboardingHeaderProps {
  onSkip: () => void;
}

export function OnboardingHeader({ onSkip }: OnboardingHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4">
      <div></div>
      <button onClick={onSkip} className="font-medium text-gray-500">
        <Typography variant="body-2">건너뛰기</Typography>
      </button>
    </header>
  );
}
