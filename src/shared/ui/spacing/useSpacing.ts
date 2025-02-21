import { type VariantProps } from 'class-variance-authority';
import { useMemo } from 'react';

import { spacingStyles } from './spacing';

// 타입 정의 (cva의 VariantProps 활용)
type SpacingProps = VariantProps<typeof spacingStyles>;

export function useSpacing(props: SpacingProps) {
  // cva의 스타일을 적용하기 위해 useMemo를 사용
  // useMemo는 props가 변경될 때만 스타일을 다시 계산
  return useMemo(() => spacingStyles(props), [props]);
}
