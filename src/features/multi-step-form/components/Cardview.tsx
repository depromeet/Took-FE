import Image from 'next/image';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';

type CardViewProps = {
  title: string;
  link: string;
  onCloseClick?: () => void;
  onClick: () => void;
};

const CardView = ({ title, link, onCloseClick, onClick }: CardViewProps) => {
  return (
    <div
      className={cn('flex justify-between rounded-md bg-gray-800', spacingStyles({ padding: 'md' }))}
      onClick={onClick}
    >
      <div>
        <div className="flex flex-col">
          <div className="text-body-5 text-gray-100">{title}</div>
          <p className="text-caption-1 text-gray-300">{link}</p>
        </div>
      </div>

      <div>
        <Image
          src="/icons/deleteIcon.svg"
          alt="삭제 아이콘"
          width={16}
          height={16}
          className="h-4 w-4 cursor-pointer"
          onClick={onCloseClick}
        />
      </div>
    </div>
  );
};

export default CardView;
