import { cn } from '@/shared/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-gray-500 dark:bg-zinc-50/10', className)} {...props} />;
}

export { Skeleton };
