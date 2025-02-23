import Image from 'next/image';

import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import Footer from '@/shared/ui/footer';
import { Tab } from '@/shared/ui/tab';

export default function Home() {
  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="inline-flex w-[600px] flex-col items-center justify-center gap-4 border border-white bg-black">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Tab variant="all">전체 보기</Tab>
        <Tab>도메인</Tab>
        <Tab>글쓰기 모임</Tab>
        <Button>다음</Button>
        <Footer current="mycard" />
        <Footer current="collection" />
        <Footer current="setting" />
      </div>
    </div>
  );
}
