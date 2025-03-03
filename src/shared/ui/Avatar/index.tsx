/**
 * 공통 컴포넌트 - Avatar
 *
 * 사용 방법:
 * <WrappedAvatar src={이미지 URL} alt="이미지 설명" size="large" />
 *
 * @param {string} [src] - 표시할 이미지의 URL. 없을 경우 기본 아이콘이 표시됩니다.
 * @param {string} [alt] - 이미지 설명 텍스트. 이미지 로드 실패 시 표시됩니다.
 * @param {'large' | 'medium' | 'small'} [size='large'] - 아바타 크기. 기본값은 'large'입니다.
 */

import React from 'react';

import AvatarIcon from '../icon/avatarIcon.svg';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: 'large' | 'medium' | 'small';
};

function WrappedAvatar({ src, alt, size = 'large' }: AvatarProps) {
  return (
    <Avatar size={size}>
      {src ? <AvatarImage src={src} /> : <AvatarImage size={size} src={AvatarIcon.src} />}
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
}
export default WrappedAvatar;
