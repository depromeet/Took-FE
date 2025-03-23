import { FirstBackground } from '../components/FirstOnboarding/FirstBackground';
import { SecondBackground } from '../components/SecondOnboarding/SecondBackground';

type Props = {
  activeIndex: number;
};

export const BackgroundContainer = ({ activeIndex }: Props) => {
  if (activeIndex === 0) return <FirstBackground />;
  if (activeIndex === 1) return <SecondBackground />;
};
