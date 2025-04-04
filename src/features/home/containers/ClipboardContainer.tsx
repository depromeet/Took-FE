'use client';

import { useRouter } from 'next/navigation';

import { Typography } from '@/shared/ui/typography';

import { CopyLinkIcon } from '../components/icons/CopyLinkIcon';

type Props = {
  id: number;
  name: string;
  job: string;
  type: string;
  profileImg: string;
};

export const ClipboardContainer = ({ id, name, job, type, profileImg }: Props) => {
  const router = useRouter();

  const goToSharePage = (query: string) => {
    router.push(`/share${query}`);
  };

  return (
    <>
      <div className="mt-6 flex w-full items-center justify-center">
        <button
          className="bg flex h-[40px] w-[252px] items-center justify-center gap-1 rounded-full bg-primary"
          onClick={() =>
            goToSharePage(
              `?profileImg=${profileImg}&name=${name}&job=${job}&jobType=${type}&url=https://www.even-took.com/card-share/${id}`,
            )
          }
        >
          <CopyLinkIcon />
          <Typography variant="body-4">내 명함 공유하기</Typography>
        </button>
      </div>
    </>
  );
};
