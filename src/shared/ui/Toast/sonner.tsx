'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast flex justify-center items-center max-w-max group-[.toaster]:bg-gray-600 group-[.toaster]:text-gray-white group-[.toaster]:text-body-4 group-[.toaster]:rounded-full group-[.toaster]:border-none group-[.toaster]:m-auto group-[.toaster]:mb-20',
          description: 'group-[.toast]:text-gray-white',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
