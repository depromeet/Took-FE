import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { Label } from '@/shared/ui/label';

const textAreaVariants = cva(
  cn(
    'flex w-full rounded-sm text-body-5 bg-gray-800 !text-gray-100 placeholder:text-body-5 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 resize-none overflow-hidden',
    spacingStyles({ padding: 'ms' }),
  ),
  {
    variants: {
      size: {
        xs: 'min-h-[12px]',
        sm: 'min-h-[24px]',
        md: 'min-h-[36px]',
        lg: 'min-h-[42px]',
        xl: 'min-h-[60px]',
        max: 'min-h-[66px]',
      },
      error: {
        true: 'border border-error-medium',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
);

type TextAreaVariantsProps = {
  totalNumber?: number;
  labelTitle?: string;
  errorMsg?: string;
} & VariantProps<typeof textAreaVariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'> & TextAreaVariantsProps>(
  ({ className, errorMsg, error, totalNumber, labelTitle, value, placeholder, size, ...props }, ref) => {
    const currentTextLength = value?.toString().length ?? 0;

    return (
      <div className="flex flex-col gap-[6px]">
        {labelTitle && <Label className="text-body-5 text-gray-100">{labelTitle}</Label>}
        <textarea
          className={cn(textAreaVariants({ size, error }), className)}
          ref={ref}
          placeholder={placeholder}
          maxLength={totalNumber}
          {...props}
        />

        {totalNumber && errorMsg ? (
          <div className="flex items-center justify-between text-caption-1 text-error-medium">
            <span>{errorMsg}</span>
            <span>
              {currentTextLength}/{totalNumber}
            </span>
          </div>
        ) : totalNumber ? (
          <div className="flex justify-end text-body-5 text-gray-400">
            {currentTextLength}/{totalNumber}
          </div>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
