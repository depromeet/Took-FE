'use client';

import { useParams } from 'next/navigation';
import React, { useRef, useState } from 'react';

import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import { Typography } from '@/shared/ui/typography';

import { CARD_TABS, TabId } from '../config/tabs-config';
import { useCardDetailQuery } from '../hooks/query/useCardDetailQuery';
import { useScrollPosition } from '../hooks/useScrollPosition';

import DomainList from './domain';
import Hobby from './hobby';
import Posts from './posts';
import Projects from './projects';
import RecentNews from './recent';
import SNS from './sns';
import { UnderlineTabs } from './underlineTabs';

function CardTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('domains');
  const { id } = useParams();
  const { data } = useCardDetailQuery(id as string);

  // 교차점 감지 훅 사용 - 감지 포인트는 컴포넌트의 최상단
  const { ref: intersectionRef, isIntersecting } = useScrollPosition({
    // 관찰 대상의 상단이 뷰포트 상단과 교차할 때 감지하기 위한 설정
    threshold: 0,
    rootMargin: '0px 0px 0px 0px', // 0px 위로 넘어가면 감지
  });
  const showAppbar = !isIntersecting;

  const sectionRefs = {
    domains: useRef<HTMLDivElement>(null),
    sns: useRef<HTMLDivElement>(null),
    news: useRef<HTMLDivElement>(null),
    hobby: useRef<HTMLDivElement>(null),
    posts: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
  };

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    sectionRefs[tabId]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      {/* 인터섹션 관찰 포인트 - 상단 경계를 감지하기 위한 요소 */}
      <div ref={intersectionRef} />

      <div className="relative -top-[20px] w-full">
        {/* sticky 헤더 영역 */}
        <div className="sticky top-0 z-10 w-full">
          {/* Appbar는 TabsComponent가 화면 상단에 도달하면 표시 */}
          {showAppbar && <Appbar page="detail" hasBackground={true} />}

          <UnderlineTabs
            tabs={CARD_TABS}
            activeTab={activeTab}
            onChange={handleTabChange}
            className={`rounded-t-2xl border-none ${spacingStyles({ paddingTop: 'sm', paddingX: 'xs' })}`}
          />
        </div>

        <div className="bg-black">
          <div
            ref={sectionRefs.domains}
            id="domains"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">관심 도메인</Typography>
            {data && <DomainList data={data.data.interestDomain} />}
          </div>

          <div
            ref={sectionRefs.sns}
            id="sns"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">SNS</Typography>
            {data && <SNS data={data.data.sns} />}
          </div>

          <div
            ref={sectionRefs.news}
            id="news"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">최근 소식</Typography>
            {data && <RecentNews data={data.data.news} />}
          </div>

          <div
            ref={sectionRefs.hobby}
            id="hobby"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">취미</Typography>
            {data && <Hobby data={data.data.hobby} />}
          </div>

          <div
            ref={sectionRefs.posts}
            id="posts"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">작성한 글</Typography>
            {data && <Posts data={data.data.content} />}
          </div>

          <div
            ref={sectionRefs.projects}
            id="projects"
            className={`${spacingStyles({ paddingTop: 'xl' })} px-[20px] pb-[77px]`}
          >
            <Typography variant="body-1">대표 프로젝트</Typography>
            {data && <Projects data={data.data.project} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardTabs;
