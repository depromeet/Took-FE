'use client';

import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const inputVariants = cva(
  'flex h-11 w-full rounded-sm px-3 py-2 text-body-5 bg-gray-800 !text-gray-100 placeholder:text-body-5 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500',
  {
    variants: {
      variant: {
        default: '',
        withBtn: 'pr-9',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type InputBodyProps = React.ComponentProps<'input'> & {
  variant?: 'default' | 'withBtn'; // variant 타입 추가
};

const InputBody = React.forwardRef<HTMLInputElement, InputBodyProps>(
  ({ className, variant, type, value, onChange, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  },
);
InputBody.displayName = 'Input';

export { InputBody };
