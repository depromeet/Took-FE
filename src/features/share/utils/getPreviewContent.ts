import SNS_CONFIG from '@/features/card-detail/config/sns-config';

import { PreviewInfo } from '../types';

// 미리보기 정보 변환을 처리하는 함수 분리
export const getPreviewContentByType = (previewInfo: PreviewInfo, type: string) => {
  switch (type) {
    case 'PROJECT':
      return previewInfo.project
        ? {
            title: previewInfo.project.title,
            description: previewInfo.project.description,
            imageUrl: previewInfo.project.imageUrl,
          }
        : {};
    case 'CONTENT':
      return previewInfo.content
        ? {
            title: previewInfo.content.title,
            description: previewInfo.content.description,
            imageUrl: previewInfo.content.imageUrl,
          }
        : {};
    case 'SNS':
      return previewInfo.sns
        ? {
            title: previewInfo.sns.type,
            description: previewInfo.sns.link,
            imageUrl: SNS_CONFIG[previewInfo.sns.type as keyof typeof SNS_CONFIG]?.iconPath || '/icons/imageIcon.svg',
          }
        : {};
    case 'HOBBY':
      return previewInfo.hobby
        ? {
            title: previewInfo.hobby,
            description: '',
          }
        : {};
    case 'NEWS':
      return previewInfo.news
        ? {
            title: previewInfo.news,
            description: '',
          }
        : {};
    case 'REGION':
      return previewInfo.region
        ? {
            title: previewInfo.region,
            description: '',
          }
        : {};
    default:
      return {};
  }
};
