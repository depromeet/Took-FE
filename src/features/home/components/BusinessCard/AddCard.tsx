import { Typography } from '@/shared/ui/typography';

import { CardPlusIcon } from '../icons/CardPlusIcon';

export const AddCard = () => {
  return (
    <div className="bg-[rgba(255,255,255, 0.2)] relative flex h-[394px] w-[270px] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl">
      <Typography variant="body-1">추가하기</Typography>
      <CardPlusIcon />
    </div>
  );
};
