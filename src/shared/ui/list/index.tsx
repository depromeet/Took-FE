import { cva, VariantProps } from "class-variance-authority"
import React from "react";

import { cn } from '@/shared/lib/utils'
import { spacingStyles } from '@/shared/spacing';

const listItemVariants = cva(
  `flex bg-gray-800 items-center rounded-md ${spacingStyles({ paddingY: 'ml', paddingX: 'md' })} w-full max-w-[320px]`,
  {
    variants: {},
    defaultVariants: {},
  }
)

const listItemTextVariants = cva(
  `overflow-hidden text-ellipsis whitespace-nowrap text-white text-body-5 w-full`,
  {
    variants: {},
    defaultVariants: {},
  }
)

export interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
  VariantProps<typeof listItemVariants> { }

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(listItemVariants(), className)}
        {...props}
      >
        {children}
      </li>
    )
  }
)

ListItem.displayName = "ListItem"

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof listItemTextVariants> { }

export const ListItemText = React.forwardRef<HTMLSpanElement, ListItemTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        className={cn(listItemTextVariants(), className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    )
  }
)

ListItemText.displayName = "ListItemText"

const listVariants = cva(
  `flex flex-col gap-4`,
  {
    variants: {},
    defaultVariants: {},
  }
)

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
  VariantProps<typeof listVariants> { }

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        className={cn(listVariants(), className)}
        ref={ref}
        {...props}
      >
        {children}
      </ul>
    )
  }
)

List.displayName = "List"

