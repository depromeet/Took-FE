'use client';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '.';

interface WrappedDialogProps {
  title: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  footer: React.ReactNode | ((close: () => void) => React.ReactNode);
  className?: string;
}

export const WrappedDialog = ({ title, children, trigger, footer, className }: WrappedDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn('w-[320px] bg-gray-600', className)}>
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle className="text-title-3 text-gray-white">{title}</DialogTitle>
        </DialogHeader>
        <div
          className={cn('flex items-center justify-center', spacingStyles({ paddingTop: 'ms', paddingBottom: 'lx' }))}
        >
          {children}
        </div>
        <DialogFooter>
          {typeof footer === 'function' ? <DialogClose asChild>{footer(() => {})}</DialogClose> : footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
