import { cva } from 'class-variance-authority';
import { HTMLAttributes, PropsWithChildren } from 'react';

import { JopType } from '@/features/home/types';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { Typography } from '@/shared/ui/typography';

type Props = {
  tagType: JopType;
} & HTMLAttributes<HTMLDivElement>;

const cardTagVariants = cva('text-white rounded-full', {
  variants: {
    tagType: {
      designer: 'bg-primary',
      developer: 'bg-secondary',
    },
  },
  defaultVariants: {
    tagType: 'designer',
  },
});

export const ShareCardTag = ({ tagType, children, ...rest }: PropsWithChildren<Props>) => {
  const { className, ...restProps } = rest;

  return (
    <div
      className={cn(cardTagVariants({ tagType }), spacingStyles({ paddingX: 'sm', paddingBottom: 'xs' }), className)}
      {...restProps}
    >
      <Typography variant="caption-1">{children}</Typography>
    </div>
  );
};
