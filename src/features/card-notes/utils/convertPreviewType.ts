import { PreviewInfoType } from '../types';

// 미리보기 정보 타입 변환 함수
export const convertPreviewInfo = (previewInfo: PreviewInfoType) => {
  return {
    PROJECT: '대표 프로젝트',
    CONTENT: '작성한 글',
    HOBBY: '취미',
    SNS: 'SNS',
    NEWS: '최근 소식',
    REGION: '활동 지역',
  }[previewInfo];
};
