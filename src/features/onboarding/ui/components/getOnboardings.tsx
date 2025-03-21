import { FirstOnboarding } from './FirstOnboarding';

export const getOnboardings = () => [
  {
    id: 1,
    render: () => <FirstOnboarding />,
  },
  {
    id: 2,
    render: () => null,
  },
  {
    id: 3,
    render: () => null,
  },
];
