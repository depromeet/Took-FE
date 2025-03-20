// hooks/useTabSync.ts
import { useEffect } from 'react';

import { TabId } from '../config/tabs-config';

type ViewState = {
  [key in TabId]?: boolean;
};

/**
 * 스크롤 위치에 따라 현재 보이는 섹션과 탭을 동기화하는 커스텀 훅
 *
 * @param viewState - 각 섹션의 가시성 상태 객체
 * @param setActiveTab - 활성 탭을 설정하는 함수
 * @returns 없음
 */
const useTabsActive = (viewState: ViewState, setActiveTab: (tabId: TabId) => void) => {
  useEffect(() => {
    // 각 섹션의 가시성에 따라 활성 탭 설정
    if (viewState.domains) setActiveTab('domains');
    else if (viewState.sns) setActiveTab('sns');
    else if (viewState.news) setActiveTab('news');
    else if (viewState.hobby) setActiveTab('hobby');
    else if (viewState.posts) setActiveTab('posts');
    else if (viewState.projects) setActiveTab('projects');
  }, [
    viewState.domains,
    viewState.sns,
    viewState.news,
    viewState.hobby,
    viewState.posts,
    viewState.projects,
    setActiveTab,
  ]);
};

export default useTabsActive;
