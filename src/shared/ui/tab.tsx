import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const tabVariants = cva(
  'inline-flex h- items-center justify-center rounded-lg border gap-2 px-3 py-1.5 text-xs cursor-pointer font-semibold transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border border-gray-200 bg-black text-gray-200',
        all: 'border-transparent bg-white text-gray-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface tabProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabVariants> {}

function Tab({ className, variant, ...props }: tabProps) {
  return (
    <div>
      <div className={cn(tabVariants({ variant }), className)} {...props} />
    </div>
  );
}

export { Tab, tabVariants };
