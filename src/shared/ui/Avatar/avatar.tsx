/** 공통 컴포넌트 - avatar
  사용 방법 : 
  <Avatar>
    <AvatarImage src={원하는 이미지 파일} />
    <AvatarFallback>{이미지 에러 시 띄울 텍스트}</AvatarFallback>
  </Avatar>
*/

'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import AvatarIcon from '../icon/avatarIcon.svg';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const avatarVariants = cva('rounded-full bg-gray-100', {
  variants: {
    size: {
      large: 'w-20 h-20',
      medium: 'w-14 h-14',
      small: 'w-[50px] h-[50px]',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants>;

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden',
        avatarVariants({ size, className }),
      )}
      {...props}
    />
  ),
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & { size?: 'large' | 'medium' | 'small' }
>(({ className, src, size = 'large', ...props }, ref) => {
  const imageSize = {
    large: 'w-[46px] h-[46px]',
    medium: 'w-7 h-7',
    small: 'w-7 h-7',
  };
  const isDefaultIcon = src === AvatarIcon.src;

  return (
    <AvatarPrimitive.Image
      ref={ref}
      src={src}
      className={cn('aspect-square bg-gray-100', isDefaultIcon ? imageSize[size] : 'h-full w-full', className)}
      {...props}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center rounded-full bg-gray-100', className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
