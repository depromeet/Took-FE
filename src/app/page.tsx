'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import WrappedInput from '@/shared/ui/Input';
import { Tab } from '@/shared/ui/tab';
import Toast from '@/shared/ui/Toast';

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
        <WrappedInput placeholder="어떤 분야에 관심이 있나요?" />
        <WrappedInput title="대표 프로젝트" placeholder="직접 참여한 프로젝트 링크를 추가해보세요" />
        <WrappedInput variant="withBtn" placeholder="close icon 테스트 중이에요" />
        <WrappedInput title="SNS" variant="withBtn" placeholder="close icon 테스트 중이에요" />
        <Toast buttonText="토스트 잘 뜨나?" message="주의해주세요" />
      </div>
    </div>
  );
}
