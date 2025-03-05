import Image from 'next/image';
import React from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

import Arrow from '../icon/Arrow.svg';
import Union from '../icon/Union.svg';


import { ListItem, ListItemText } from '.';

type WrappedListProps = {
  /** 아이템 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  withArrow?: React.ReactNode;
  /** 아이템 text */
  text: string;
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
  leftIcon = <UnionIcon />,
  withArrow = <ArrowBtn />,
  text
}) => {
  return (
    <ListItem className='flex'>
      {leftIcon && <div className={cn('left-icon', spacingStyles({ paddingRight: 'sm' }))}>{leftIcon}</div>}
      <ListItemText>
        {text}
      </ListItemText>
      {withArrow && <div className={cn('with-arrow', spacingStyles({ marginLeft: 'md' }))}>{withArrow}</div>}
    </ListItem>
  );
}

const UnionIcon = () => {
  return (
    <span className={cn('flex items-center justify-center w-12 h-12')}>
      <Image
        src={Union}
        alt='UnionIcon'
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
        src={Arrow}
        alt='Arrow'
      />
    </button>
  )
}

export default WrappedListItem;