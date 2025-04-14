export type SnsType =
  | 'LINKEDIN'
  | 'INSTAGRAM'
  | 'FACEBOOK'
  | 'BEHANCE'
  | 'GITHUB'
  | 'VELOG'
  | 'TISTORY'
  | 'BRUNCH'
  | 'MEDIUM'
  | 'NAVER_BLOG'
  | 'ETC';

interface SnsConfig {
  iconPath: string;
  iconAlt: string;
}

const SNS_CONFIG: Record<SnsType, SnsConfig> = {
  LINKEDIN: {
    iconPath: '/icons/sns-icon/linkedin.svg',
    iconAlt: '링크드인',
  },
  INSTAGRAM: {
    iconPath: '/icons/sns-icon/instagram.svg',
    iconAlt: '인스타그램',
  },
  // 피그마에 현재 없습니다.
  FACEBOOK: {
    iconPath: '/icons/design-icon-white.svg',
    iconAlt: '페이스북',
  },
  BEHANCE: {
    iconPath: '/icons/sns-icon/behance.svg',
    iconAlt: '비핸스',
  },
  GITHUB: {
    iconPath: '/icons/sns-icon/github.svg',
    iconAlt: '깃허브',
  },
  VELOG: {
    iconPath: '/icons/sns-icon/velog.svg',
    iconAlt: '벨로그',
  },
  TISTORY: {
    iconPath: '/icons/sns-icon/tistory.svg',
    iconAlt: '티스토리',
  },
  BRUNCH: {
    iconPath: '/icons/sns-icon/brunch.svg',
    iconAlt: '브런치',
  },

  /**
   * 현재 피그마에 없습니다.
   * 임시 svg로 설정했습니다.
   */
  MEDIUM: {
    iconPath: '/icons/design-icon-white.svg',
    iconAlt: '미디엄',
  },
  NAVER_BLOG: {
    iconPath: '/icons/sns-icon/naver_blog.svg',
    iconAlt: '네이버 블로그',
  },

  ETC: {
    iconPath: '/icons/designer-icon-white.svg',
    iconAlt: '기타 SNS',
  },
};

export default SNS_CONFIG;
