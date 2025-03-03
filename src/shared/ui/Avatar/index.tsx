import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import AvatarIcon from '../icon/avatarIcon.svg';

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
