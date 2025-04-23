import { FirstOnboardingContainer } from '../containers/FirstOnboardingContainer';
import { SecondOnboardingContainer } from '../containers/SecondOnboardingContainer';
import { ThirdOnboardingContainer } from '../containers/ThirdOnboardingContainer';

export const slides = [
  {
    id: 1,
    descriptions: ['과한 사적정보는 빼고', '내가 원하는 정보만'],
    component: FirstOnboardingContainer,
  },
  {
    id: 2,
    descriptions: ['QR로 쉽게 공유하고', '내 주변 사람에게도 버튼 하나로'],
    component: SecondOnboardingContainer,
  },
  {
    id: 3,
    descriptions: ['손쉽게 툭 공유하는', '나만의 명함'],
    component: ThirdOnboardingContainer,
  },
];
