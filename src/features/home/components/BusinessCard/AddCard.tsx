import { Typography } from '@/shared/ui/typography';

import { CardPlusIcon } from '../icons/CardPlusIcon';

import { AddCardBackground } from './Background/AddCradBackground';

export const AddCard = () => {
  return (
    <div className="relative flex h-[394px] w-[270px] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.1)]">
      <AddCardBackground className="absolute top-0" />
      <Typography variant="body-1">추가하기</Typography>
      <CardPlusIcon />
    </div>
  );
};
