import Image from 'next/image';

import { cn } from '../lib/utils';

type ImagePropsType = {
  size: 'large' | 'medium' | 'small' | 'max';
  src?: string;
  alt?: string;
  className?: string;
};

const sizeVariants = {
  large: { container: 'h-[132px] w-[132px]', image: { width: 41, height: 62.1 }, opacity: 'opacity-20' },
  medium: { container: 'h-[66px] w-[66px]', image: { width: 19.04, height: 28.84 }, opacity: '' },
  small: { container: 'h-14 w-14', image: { width: 15, height: 22.72 }, opacity: '' },
  max: { container: 'h-full w-full', image: { width: 15, height: 22.72 }, opacity: '' },
};

/**
 * 공통 컴포넌트 : Img
 *
 * @example
 * <Img size="large" src="/images/sample.png" alt="이미지" />
 *
 * @param {'large' | 'medium' | 'small'} size - 컴포넌트 크기
 * @param {string} className - 추가 클래스명
 *
 * @returns {JSX.Element} - 이미지 컴포넌트
 */

function Img({ size, src = '/icons/imageIcon.svg', alt = '이미지', className, ...props }: ImagePropsType) {
  const { container, image, opacity } = sizeVariants[size];
  const isDefaultImage = src == '/icons/imageIcon.svg';

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center rounded-md border border-opacity-white-10 bg-opacity-white-20 p-3',
        container,
        className,
      )}
    >
      {isDefaultImage ? (
        <Image src={src} alt={alt} width={image.width} height={image.height} className={opacity} {...props} />
      ) : (
        <Image src={src} alt={alt} fill className="rounded-md object-cover" {...props} />
      )}
    </div>
  );
}

export default Img;
