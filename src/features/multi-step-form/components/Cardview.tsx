import Image from 'next/image';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

type CardViewProps = {
  index: number;
  title: string;
  link: string;
  onCloseClick?: () => void;
  onClick: () => void;
};

const CardView = ({ index, title, link, onCloseClick, onClick }: CardViewProps) => {
  return (
    <div
      className={cn('flex w-full justify-between rounded-md bg-gray-800', spacingStyles({ padding: 'md' }))}
      onClick={onClick}
    >
      <div className="flex w-full gap-2 overflow-hidden">
        <div className="flex flex-col">
          <div className="overflow-hidden text-ellipsis text-body-5 text-gray-100">{title}</div>
          <p className="line-clamp-1 text-ellipsis text-caption-1 text-gray-300">{link}</p>
        </div>
      </div>

      {index !== 0 && (
        <Image
          src="/icons/deleteIcon.svg"
          alt="삭제 아이콘"
          width={16}
          height={16}
          className="h-4 w-4 cursor-pointer"
          onClick={onCloseClick}
        />
      )}
    </div>
  );
};

export default CardView;
