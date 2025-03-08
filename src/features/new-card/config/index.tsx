const DOMAIN_BASE_URL = '/card-create';

export const CAREER_SELECT = {
  title: '직군을 선택해 주세요',
  description: '직군에 맞는 템플릿으로 내 명함을 만들 수 있어요.',
  listText: {
    design: '디자인 직군',
    dev: '개발 직군',
  },
};

export const ROUTE_PATH = {
  design: `${DOMAIN_BASE_URL}/new-card/multi-step-form`,
  dev: `${DOMAIN_BASE_URL}/new-card/multi-step-form`,
};
