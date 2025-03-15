'use client';

import { useParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import { Typography } from '@/shared/ui/typography';

import { CARD_TABS, TabId } from '../config/tabs-config';
import { useCardDetailQuery } from '../hooks/query/useCardDetailQuery';
import { useScrollPosition } from '../hooks/useScrollPosition';
import useTabsActive from '../hooks/useTabsActive';

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

  const [domainsRef, domainsInView] = useInView({ threshold: 1 });
  const [snsRef, snsInView] = useInView({ threshold: 1 });
  const [newsRef, newsInView] = useInView({ threshold: 1 });
  const [hobbyRef, hobbyInView] = useInView({ threshold: 1 });
  const [postsRef, postsInView] = useInView({ threshold: 1 });
  const [projectsRef, projectsInView] = useInView({ threshold: 1 });

  // 커스텀 훅을 사용하여 스크롤 위치와 탭 동기화
  useTabsActive(
    {
      domains: domainsInView,
      sns: snsInView,
      news: newsInView,
      hobby: hobbyInView,
      posts: postsInView,
      projects: projectsInView,
    },
    setActiveTab,
  );

  // ref가 변경 가능한 객체임을 명시
  const sectionRefs = {
    domains: useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>,
    sns: useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>,
    news: useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>,
    hobby: useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>,
    posts: useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>,
    projects: useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>,
  };

  // 기존 ref와 intersection observer ref를 결합하는 함수
  const combineRefs = (section: TabId) => (el: HTMLDivElement) => {
    sectionRefs[section].current = el;

    // 각 섹션에 맞는 ref 설정
    if (section === 'domains') domainsRef(el);
    else if (section === 'sns') snsRef(el);
    else if (section === 'news') newsRef(el);
    else if (section === 'hobby') hobbyRef(el);
    else if (section === 'posts') postsRef(el);
    else if (section === 'projects') projectsRef(el);
  };

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);

    // scroll-margin-top CSS 속성 적용
    /**
     * 헤더 높이에 맞게 조정해도 title이 나오지 않는 문제 발생
     * 임시로 조금더 추가 - 현재 헤더 높이(64px) + 임시 값(36px)
     */
    const tabsScrollMargin = '100px';

    if (sectionRefs[tabId]?.current) {
      sectionRefs[tabId].current.style.scrollMarginTop = tabsScrollMargin;
      sectionRefs[tabId].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {/* 인터섹션 관찰 포인트 - 상단 경계를 감지하기 위한 요소 */}
      <div ref={intersectionRef} />

      <div className="relative -top-[20px] w-full rounded-t-2xl bg-gray-black">
        {/* sticky 헤더 영역 */}
        <div className="sticky top-0 z-10 w-full">
          {/* Appbar에 트랜지션 효과 추가 */}
          <div
            className={`transition-all duration-300 ease-in-out ${showAppbar ? 'max-h-16 opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
          >
            <Appbar page="detail" hasBackground={true} />
          </div>

          <UnderlineTabs
            tabs={CARD_TABS}
            activeTab={activeTab}
            onChange={handleTabChange}
            className={`rounded-t-2xl border-none ${spacingStyles({ paddingTop: 'sm', paddingX: 'xs' })}`}
          />
        </div>

        <div className="bg-black">
          <div
            ref={combineRefs('domains')}
            id="domains"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">관심 도메인</Typography>
            {data && <DomainList data={data.data.interestDomain} />}
          </div>

          <div
            ref={combineRefs('sns')}
            id="sns"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">SNS</Typography>
            {data && <SNS data={data.data.sns} />}
          </div>

          <div
            ref={combineRefs('news')}
            id="news"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">최근 소식</Typography>
            {data && <RecentNews data={data.data.news} />}
          </div>

          <div
            ref={combineRefs('hobby')}
            id="hobby"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">취미</Typography>
            {data && <Hobby data={data.data.hobby} />}
          </div>

          <div
            ref={combineRefs('posts')}
            id="posts"
            className={`${spacingStyles({ paddingY: 'xl' })} border-b-[4px] border-gray-800 px-[20px]`}
          >
            <Typography variant="body-1">작성한 글</Typography>
            {data && <Posts data={data.data.content} />}
          </div>

          <div
            ref={combineRefs('projects')}
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
