/**
 * 공통 컴포넌트 - sonner(toast)
 *
 * 사용 방법 :
 *  <Toaster
 *    icons={{
 *      {error}: <Image src={ErrorIcon} className="h-6 w-6 text-red-500" alt="error-icon" />,
 *    }}
 *  /> // 반드시 이 컴포넌트가 있어야만 toast가 화면에 뜸
 *  <button onClick={() => toast.error('토스트 내의 문구')}>문구</button>
 *
 * @returns {JSX.Element} - Toaster 컴포넌트
 *
 * 저 전체를 하나의 컴포넌트로 만드는 게 나을지.. 그냥 이대로 둘지 고민이 됩니당..
 */
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
            'group toast flex justify-center items-center max-w-max group-[.toaster]:bg-gray-600 group-[.toaster]:text-gray-white group-[.toaster]:text-body-4 group-[.toaster]:rounded-full group-[.toaster]:border-none',
          description: 'group-[.toast]:text-gray-white',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
