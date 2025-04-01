const DOMAIN_BASE_URL = '/card-create';

export const ONBOARDING_CARD_CREATE = {
  title: '명함 생성 방법을 선택해주세요',
  description: '원하는 방법으로 새로운 명함을 만들 수 있어요!',
  listText: {
    createNewCard: '새로운 명함 만들기',
    modifyExistingCard: '기존 명함 수정해서 새로 만들기',
  },
};

export const ROUTE_PATH = {
  newCard: `${DOMAIN_BASE_URL}/new-card`,
  modifyCard: `${DOMAIN_BASE_URL}/modify-card`,
};
