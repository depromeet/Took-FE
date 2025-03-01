'use client';

import Image from 'next/image';
import { toast } from 'sonner';

import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import ErrorIcon from '@/shared/ui/icon/sonnerIcon.svg';
import Input from '@/shared/ui/Input/input';
import { Toaster } from '@/shared/ui/sonner';
import { Tab } from '@/shared/ui/tab';

export default function Home() {
  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="inline-flex w-full max-w-[600px] flex-col items-center justify-center gap-4 border border-white bg-black">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Tab variant="all">전체 보기</Tab>
        <Tab>도메인</Tab>
        <Tab>글쓰기 모임</Tab>
        <div className="flex w-full justify-center text-base">
          <Button variant="prev">이전</Button>
          <Button>다음</Button>
          <Button disabled>다음 비활성화</Button>
        </div>
        <Input
          label="관심 도메인"
          placeholder="어떤 분야에 관심이 있나요?"
          info="생각과 경험이 담긴 글을 공유해 보세요"
        />
        <Toaster
          icons={{
            error: <Image src={ErrorIcon} className="h-6 w-6 text-red-500" alt="error-icon" />,
          }}
          position="bottom-right"
        />
        <button onClick={() => toast.error('주의 해주세요 주의해주세요 이렇게 하지 마세요')}>토스트 잘 뜨나?</button>
        <Input label="소속 정보" placeholder="어디에서 활동 중인지 알려주세요" />
      </div>
    </div>
  );
}
