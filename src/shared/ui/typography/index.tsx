import { typography, type TypographyVariantProps } from './typography';

type TypoGraphyProps = TypographyVariantProps & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

/**
 * `Typography` 컴포넌트는 Took 디자인 시스템 글꼴 및 다양한 텍스트 스타일을 적용할 수 있는 컴포넌트입니다.
 *
 * @param {TypoGraphyProps} props - 컴포넌트에 전달되는 props
 * @param {React.ElementType} [props.as=span] - 렌더링할 HTML 태그를 지정합니다. 기본값은 `span`입니다. div, span, p 등의 태그를 사용할 수 있습니다.
 * @param {string} props.variant - 텍스트 스타일을 지정하는 variant 값입니다.
 * @param {React.ReactNode} props.children - 컴포넌트 내부에 렌더링할 자식 요소들입니다.
 *
 * @returns {JSX.Element} 지정된 태그와 스타일을 적용한 텍스트 요소를 반환합니다.
 */

export const Typography = ({ as: Tag = "span", variant, children }: TypoGraphyProps) => {
  const className = typography({ variant });
  return <Tag className={className}>{children}</Tag>;
};