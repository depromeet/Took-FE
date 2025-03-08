'use client';

import React, { useRef, useState } from 'react';

import { spacingStyles } from '@/shared/spacing';
import { Typography } from '@/shared/ui/typography';

import { CARD_TABS, TabId } from '../config/tabs-config';
import { useUserDetail } from '../hooks/sample';

import DomainList from './domain';
import Hobby from './hobby';
import Posts from './posts';
import Projects from './projects';
import RecentNews from './recent';
import SNSLinks from './snsLink';
import { UnderlineTabs } from './underlineTabs';

function CardTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('domains');
  const { data: userDataDetail } = useUserDetail();

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
    <div className="relative -top-[10px] w-full">
      {/* UnderlineTabs 항상 표시, 단 showAppbar 상태에 따라 sticky 여부 결정 */}
      <div className="sticky top-0 w-full rounded-none rounded-t-2xl">
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
          {userDataDetail && <DomainList data={userDataDetail.userDataDetail.domains} />}
        </div>

        <div
          ref={sectionRefs.sns}
          id="sns"
          className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
        >
          <Typography variant="body-1">SNS</Typography>
          {userDataDetail && <SNSLinks data={userDataDetail.userDataDetail.snsLinks} />}
        </div>

        <div
          ref={sectionRefs.news}
          id="news"
          className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
        >
          <Typography variant="body-1">최근 소식</Typography>
          {userDataDetail && <RecentNews data={userDataDetail.userDataDetail.recentNews} />}
        </div>

        <div
          ref={sectionRefs.hobby}
          id="hobby"
          className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
        >
          <Typography variant="body-1">취미</Typography>
          {userDataDetail && <Hobby data={userDataDetail.userDataDetail.hobby} />}
        </div>

        <div
          ref={sectionRefs.posts}
          id="posts"
          className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
        >
          <Typography variant="body-1">작성한 글</Typography>
          {userDataDetail && <Posts data={userDataDetail.userDataDetail.posts} />}
        </div>

        <div
          ref={sectionRefs.projects}
          id="projects"
          className={`${spacingStyles({ paddingTop: 'xl' })} px-[20px] pb-[77px]`}
        >
          <Typography variant="body-1">대표 프로젝트</Typography>
          {userDataDetail && <Projects data={userDataDetail.userDataDetail.posts} />}
        </div>
      </div>
    </div>
  );
}

export default CardTabs;
