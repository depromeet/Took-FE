import Image from 'next/image';
import React from 'react';

import { cn } from '../lib/utils';

type ImagePropsType = {
  size: 'large' | 'medium' | 'small';
  src?: string;
  alt?: string;
};

const sizeVariants = {
  large: { container: 'h-[132px] w-[132px]', image: { width: 41, height: 62.1 }, opacity: 'opacity-20' },
  medium: { container: 'h-[66px] w-[66px]', image: { width: 19.04, height: 28.84 }, opacity: '' },
  small: { container: 'h-14 w-14', image: { width: 15, height: 22.72 }, opacity: '' },
};

/**
 * 공통 컴포넌트 : Img
 *
 * @example
 * <Img size="large" src="/images/sample.png" alt="이미지" />
 *
 * @param {'large' | 'medium' | 'small'} size - 컴포넌트 크기
 *
 * @returns {JSX.Element} - 이미지 컴포넌트
 */
function Img({ size, src = '/icons/imageIcon.svg', alt = '이미지', ...props }: ImagePropsType) {
  const { container, image, opacity } = sizeVariants[size];
  const isDefaultImage = src == '/icons/imageIcon.svg';

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-md border border-opacity-white-10 bg-opacity-white-20 p-3',
        container,
      )}
    >
      {isDefaultImage ? (
        <Image src={src} alt={alt} width={image.width} height={image.height} className={opacity} {...props} />
      ) : (
        <Image src={src} alt={alt} fill className="object-cover" {...props} />
      )}
    </div>
  );
}

export default Img;
