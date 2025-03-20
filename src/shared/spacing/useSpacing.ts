import { type VariantProps } from 'class-variance-authority';
import { useMemo } from 'react';

import { spacingStyles } from './spacing';

// 타입 정의 (cva의 VariantProps 활용)
type SpacingProps = VariantProps<typeof spacingStyles>;

/**
 * useSpacing
 * @description cva의 스타일을 적용하기 위한 커스텀 훅 - 동적인 스타일을 적용할 때 사용
 *
 * @param props - cva의 VariantProps 활용
 * @returns useMemo를 사용하여 props가 변경될 때만 스타일을 다시 계산
 */

export function useSpacing(props: SpacingProps) {
  // cva의 스타일을 적용하기 위해 useMemo를 사용
  // useMemo는 props가 변경될 때만 스타일을 다시 계산
  return useMemo(() => spacingStyles(props), [props]);
}
