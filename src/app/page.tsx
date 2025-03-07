'use client';

import Appbar from '@/shared/ui/appbar';
import WrappedAvatar from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/button';
import Header from '@/shared/ui/header';
import Img from '@/shared/ui/img';
import WrappedInput from '@/shared/ui/Input';
import { Tab } from '@/shared/ui/tab';
import Thumbnail from '@/shared/ui/thumbnail';
import Toast from '@/shared/ui/Toast';

export default function Home() {
  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="inline-flex w-full max-w-[600px] flex-col items-center justify-center gap-4 border border-white bg-black">
        <Appbar page="main" onLeftClick={() => console.log('left')} onRightClick={() => console.log('right')} />
        <Header
          title={`명함에 추가할 태그를 \n 선택해주세요`}
          description="직군에 맞는 템플릿으로 내 명함을 만들 수 있어요!"
        />
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
        <div className="flex gap-3">
          <Thumbnail tag="대표 프로젝트" title="프로젝트 제목" description="link" />
          <Thumbnail
            tag="최근 소식"
            description={`부동산 스타트업에서 2년간 일하다가\n 퇴사하고 지금은 이직 준비 중이에요`}
          />
        </div>
        <div className="flex gap-2">
          <Img size="large" />
          <Img size="medium" src="/icons/logo.svg" />
          <Img size="small" />
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
