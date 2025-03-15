import { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/shared/lib/utils';

import { typography, type TypographyVariantProps } from './typography';

type TypographyProps<T extends ElementType = 'span'> = {
  as?: T;
  children: React.ReactNode;
} & TypographyVariantProps &
  ComponentPropsWithoutRef<T>;

/**
 * `Typography` 컴포넌트는 Took 디자인 시스템 글꼴 및 다양한 텍스트 스타일을 적용할 수 있는 컴포넌트입니다.
 *
 * @param {TypographyProps} props - 컴포넌트에 전달되는 props
 * @param {React.ElementType} [props.as=span] - 렌더링할 HTML 태그를 지정합니다. 기본값은 `span`입니다. div, span, p 등의 태그를 사용할 수 있습니다.
 * @param {string} props.variant - 텍스트 스타일을 지정하는 variant 값입니다.
 * @param {React.ReactNode} props.children - 컴포넌트 내부에 렌더링할 자식 요소들입니다.
 *
 * @returns {JSX.Element} 지정된 태그와 스타일을 적용한 텍스트 요소를 반환합니다.
 */
export const Typography = <T extends ElementType = 'span'>({
  as,
  variant,
  color,
  children,
  ...rest
}: TypographyProps<T>) => {
  const Tag = as ?? 'span';
  const className = typography({ variant, color });
  const { className: outerClassName, ...restProps } = rest;

  return (
    <Tag className={cn(className, outerClassName)} {...restProps}>
      {children}
    </Tag>
  );
};
