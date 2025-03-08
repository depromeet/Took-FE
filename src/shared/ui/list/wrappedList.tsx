import Image from 'next/image';
import React from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

import { ListItem, ListItemText } from '.';

type LeftIconType = 'design' | 'dev';

type WrappedListProps = {
  /** 아이템 왼쪽 아이콘 */
  leftIcon?: LeftIconType;
  rightIcon?: React.ReactNode;
  withArrow?: React.ReactNode;
  /** 아이템 text */
  text: string;
  /** 클릭 이벤트 */
  onClick?: () => void;
}

/**
 * @description
 * `WrappedListItem` 컴포넌트는 리스트 아이템을 렌더링합니다.
 * 왼쪽 아이콘, 텍스트, 오른쪽 아이콘을 props로 받아서 표시합니다.
 *
 * @param {WrappedListProps} props - 컴포넌트에 전달되는 props
 * @param {React.ReactNode} props.leftIcon - 리스트 아이템의 왼쪽에 표시될 아이콘
 * @param {React.ReactNode} props.rightIcon - 리스트 아이템의 오른쪽에 표시될 아이콘
 * @param {string} props.text - 리스트 아이템에 표시될 텍스트
 *
 * @returns {JSX.Element} 렌더링된 리스트 아이템 컴포넌트
 */

const WrappedListItem: React.FC<WrappedListProps> = ({
  leftIcon,
  withArrow = <ArrowBtn />,
  text,
  onClick
}) => {
  const leftIconMap: { [K in LeftIconType]: JSX.Element } = {
    design: <UnionIcon />,
    dev: <EngineeringIcon />,
  }

  const LeftIcon = leftIcon ? leftIconMap[leftIcon] : null;

  return (
    <ListItem className={cn('flex text-gray-white', spacingStyles({ paddingY: 'ml' }))} onClick={onClick}>
      <div className='flex items-center w-full h-[48px]'>
        {leftIcon && <div className={cn('left-icon', spacingStyles({ paddingRight: 'sm' }))}>{LeftIcon}</div>}
        <ListItemText>
          {text}
        </ListItemText>
        {withArrow && <div className={cn('with-arrow', spacingStyles({ marginLeft: 'md' }))}>{withArrow}</div>}
      </div>
    </ListItem>
  );
}

// 피그마에서 이미지 못가져옴 이슈로 인해 임시로 svg 아이콘으로 직접 대체
const EngineeringIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M39.4446 11.003C39.4446 8.6083 37.5033 6.66699 35.1085 6.66699H20.7806C18.3859 6.66699 16.4446 8.60831 16.4446 11.003V20.3311C16.4446 22.7259 14.5033 24.6672 12.1085 24.6672H8.78038C6.38565 24.6672 4.44434 26.6085 4.44434 29.0032V37.3309C4.44434 39.7257 6.38565 41.667 8.78038 41.667H17.1083C19.503 41.667 21.4443 39.7257 21.4443 37.3309V34.0028C21.4443 31.608 23.3856 29.6667 25.7804 29.6667H27.9446H35.1085C37.5033 29.6667 39.4446 27.7254 39.4446 25.3307V11.003Z" fill="url(#paint0_linear_994_19028)" />
      <defs>
        <linearGradient id="paint0_linear_994_19028" x1="21.5278" y1="6.66699" x2="21.5278" y2="41.6668" gradientUnits="userSpaceOnUse">
          <stop stopColor="#72A8FF" />
          <stop offset="1" stopColor="#C3D3FF" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const UnionIcon = () => {
  return (
    <span className={cn('flex items-center justify-center w-12 h-12')}>
      <Image
        src="/icons/unionIcon.svg"
        alt='UnionIcon'
        width={40}
        height={40}
      />
    </span>
  )
}

type ArrowProps = {
  width?: number;
  height?: number;
  onClick?: () => void;
}

const ArrowBtn = ({
  onClick
}: ArrowProps) => {
  return (
    <button
      className={cn('flex items-center justify-center w-6 h-6 cursor-pointer')}
      onClick={onClick}
    >
      <Image
        src="/icons/rightArrow.svg"
        alt='Arrow'
        width={8}
        height={8}
      />
    </button>
  )
}

export default WrappedListItem;