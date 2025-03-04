'use client';

import { cn } from '@/shared/lib/utils';
import { Progress } from '@/shared/ui/progressBar/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  color?: string;
  className?: string;
}

/** 공통 컴포넌트 - ProgressBar
 * 진행 상태를 시각적으로 표시하는 ProgressBar 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 속성 객체
 * @param {number} props.currentStep - 현재 단계 값
 * @param {number} props.totalSteps - 전체 단계 수
 * @param {string} [props.color="bg-primary-hover"] - 진행 바의 색상
 * @param {string} [props.className] - 추가적인 클래스명
 * @returns {JSX.Element} 렌더링된 ProgressBar 컴포넌트
 *
 * @example
 * // 기본 사용법 (3단계 중 2단계 진행)
 * <ProgressBar currentStep={2} totalSteps={3} />
 *
 * // 커스텀 색상 적용
 * <ProgressBar currentStep={1} totalSteps={5} color="bg-blue-500" />
 */

export const ProgressBar = ({ currentStep, totalSteps, color = 'bg-primary-hover', className }: ProgressBarProps) => {
  // 진행률 계산 (0-100 사이의 값)
  const progressPercentage = Math.min(Math.max(Math.round((currentStep / totalSteps) * 100), 0), 100);

  return (
    <div className="w-full space-y-2">
      <Progress value={progressPercentage} color={color} className={cn(className)} />
    </div>
  );
};

export default ProgressBar;
