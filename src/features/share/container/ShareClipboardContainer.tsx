import { cn } from '@/shared/lib/utils';
import { Typography } from '@/shared/ui/typography';

type ShareClipboardContainerProps = {
  isAnimating: boolean;
};

export const ShareClipboardContainer = ({ isAnimating }: ShareClipboardContainerProps) => {
  return (
    <div
      className={cn(
        'mt-6 flex w-full items-center justify-center transition-opacity duration-300',
        isAnimating ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
    >
      <button className="flex h-[40px] w-[252px] items-center justify-center gap-1 rounded-full bg-opacity-purple-30">
        <Typography variant="body-4">명함을 택해 세부정보를 열람해보세요</Typography>
      </button>
    </div>
  );
};
