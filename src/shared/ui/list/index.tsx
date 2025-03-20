'use client';

import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

const listItemVariants = cva(`flex items-center rounded-md  w-full cursor-pointer`, {
  variants: {
    variant: {
      createCardItem: `bg-gray-800 active:bg-gray-700 ${spacingStyles({ paddingY: 'ml', paddingX: 'md' })}`,
      settingItem: `active:bg-gray-700 ${spacingStyles({ paddingY: 'ms' })}`,
    },
  },
  defaultVariants: {
    variant: 'createCardItem',
  },
});

const listItemTextVariants = cva(`overflow-hidden text-ellipsis whitespace-nowrap w-full`, {
  variants: {
    variant: {
      createCardItem: 'text-body-5 text-gray-white',
      settingItem: 'text-body-3 text-gray-50',
    },
  },
  defaultVariants: {
    variant: 'createCardItem',
  },
});

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement>, VariantProps<typeof listItemVariants> {}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <li ref={ref} className={cn(listItemVariants({ variant }), className)} {...props}>
        {children}
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof listItemTextVariants> {}

export const ListItemText = React.forwardRef<HTMLSpanElement, ListItemTextProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span className={cn(listItemTextVariants({ variant }), className)} ref={ref} {...props}>
        {children}
      </span>
    );
  },
);

ListItemText.displayName = 'ListItemText';

const listVariants = cva(`flex flex-col`, {
  variants: {
    variant: {
      createCardItem: 'gap-4',
      settingItem: '',
    },
  },
  defaultVariants: {
    variant: 'createCardItem',
  },
});

export interface ListProps extends React.HTMLAttributes<HTMLUListElement>, VariantProps<typeof listVariants> {}

export const List = React.forwardRef<HTMLUListElement, ListProps>(({ className, variant, children, ...props }, ref) => {
  return (
    <ul className={cn(listVariants({ variant }), className)} ref={ref} {...props}>
      {children}
    </ul>
  );
});

List.displayName = 'List';
