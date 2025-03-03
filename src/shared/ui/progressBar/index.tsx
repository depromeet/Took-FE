'use client';

import { cn } from '@/shared/lib/utils';
import { Progress } from '@/shared/ui/progressBar/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  // 진행률 계산 (0-100 사이의 값)
  const progressPercentage = Math.min(Math.max(Math.round((currentStep / totalSteps) * 100), 0), 100);

  return (
    <div className="w-full space-y-2">
      <Progress value={progressPercentage} className={cn(className)} />
    </div>
  );
};

export default ProgressBar;
