'use client';

import Image from 'next/image';
import { toast } from 'sonner';

import Appbar from '@/shared/ui/appbar';
import WrappedAvatar from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/button';
import ErrorIcon from '@/shared/ui/icon/sonnerIcon.svg';
import WrappedInput from '@/shared/ui/Input';
import { Toaster } from '@/shared/ui/sonner';
import { Tab } from '@/shared/ui/tab';

export default function Home() {
  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="inline-flex w-full max-w-[600px] flex-col items-center justify-center gap-4 border border-white bg-black">
        <Appbar page="main" onLeftClick={() => console.log('left')} onRightClick={() => console.log('right')} />
        <div className="flex w-full items-center justify-center">
          <WrappedAvatar />
          <WrappedAvatar size="medium" src="https://github.com/shadcn.png" />
          <WrappedAvatar size="medium" />
          <WrappedAvatar size="small" />
        </div>
        <Tab variant="all">전체 보기</Tab>
        <Tab>도메인</Tab>
        <Tab>글쓰기 모임</Tab>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <div className="flex w-11/12 items-center justify-center gap-2">
            <Button variant="prev">이전으로</Button>
            <Button variant="prev" disabled>
              이전으로 비활성화
            </Button>
          </div>
          <Button>다음</Button>
          <Button disabled>다음 비활성화</Button>
        </div>

        <WrappedInput placeholder="어떤 분야에 관심이 있나요?" />
        <WrappedInput title="대표 프로젝트" placeholder="직접 참여한 프로젝트 링크를 추가해보세요" />
        <WrappedInput variant="withBtn" placeholder="close icon 테스트 중이에요" />
        <WrappedInput title="SNS" variant="withBtn" placeholder="close icon 테스트 중이에요" />
        <Toaster
          icons={{
            error: <Image src={ErrorIcon} className="h-6 w-6 text-red-500" alt="error-icon" />,
          }}
          position="bottom-center"
        />
        <button className="text-white" onClick={() => toast.error('주의 해주세요')}>
          토스트 잘 뜨나?
        </button>
      </div>
    </div>
  );
}
