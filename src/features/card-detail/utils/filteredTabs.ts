import { TabItem, CARD_TABS } from '../config/tabs-config';
import { CardDetailDto } from '../types/cardDetail';

export const getFilteredTabs = (data: CardDetailDto): TabItem[] => {
  return CARD_TABS.filter((tab) => {
    switch (tab.id) {
      case 'domains':
        return data?.data.interestDomain && data.data.interestDomain.length > 0;
      case 'sns':
        return data?.data.sns && data.data.sns.length > 0;
      case 'news':
        return data?.data.news;
      case 'hobby':
        return data?.data.hobby;
      case 'posts':
        return data?.data.content && data.data.content.length > 0;
      case 'projects':
        return data?.data.project && data.data.project.length > 0;
      default:
        return false;
    }
  });
};
