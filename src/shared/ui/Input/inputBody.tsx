import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const InputBody = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-sm bg-gray-800 px-3 py-2 text-base transition-colors placeholder:text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
InputBody.displayName = 'Input';

export { InputBody };
