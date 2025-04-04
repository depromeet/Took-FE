import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Typography } from '@/shared/ui/typography';

import { Card } from '../types';

type ShareClipboardContainerProps = {
  isAnimating: boolean;
  cardData: Card;
};

export const OpenShareCardDetailContainer = ({ isAnimating, cardData }: ShareClipboardContainerProps) => {
  const router = useRouter();
  const { id } = useParams();

  const handleMoveToDetail = () => {
    router.push(`/card-detail/${id}?type=receivedcard`);
  };
  return (
    <div
      className={cn(
        'mt-6 flex w-full items-center justify-center transition-opacity duration-300',
        isAnimating ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
      onClick={handleMoveToDetail}
    >
      <button
        className={cn(
          'flex h-[40px] w-[252px] items-center justify-center gap-1 rounded-full',
          cardData?.job === 'DESIGNER' ? 'bg-opacity-purple-30' : 'bg-[rgba(45,66,255,0.3)]',
        )}
      >
        <Typography variant="body-4">명함을 클릭해 세부정보를 열람해보세요</Typography>
      </button>
    </div>
  );
};
