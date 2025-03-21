import Image from 'next/image';

import { slides } from '../../config/slides';

export const FirstOnboarding = () => {
  const { id, description, imageUrl } = slides[0];

  return <Image src={imageUrl} alt={`onboarding-${id}`} width={375} height={812} priority quality={100} />;
};
