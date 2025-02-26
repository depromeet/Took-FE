'use client';

import * as InputLabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const InputLabelVariants = cva(
  'text-sm text-gray-50 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-[150%] tracking-[-0.28px]',
);

const InputLabel = React.forwardRef<
  React.ElementRef<typeof InputLabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof InputLabelPrimitive.Root> & VariantProps<typeof InputLabelVariants>
>(({ className, ...props }, ref) => (
  <InputLabelPrimitive.Root ref={ref} className={cn(InputLabelVariants(), className)} {...props} />
));
InputLabel.displayName = InputLabelPrimitive.Root.displayName;

export { InputLabel };
