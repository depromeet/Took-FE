import { Background } from '../components/Background';
import { DecoAura } from '../components/DecoAura';

type Props = {
  jobType: 'DESIGNER' | 'DEVELOPER';
};

export const BackgroundContainer = ({ jobType }: Props) => {
  return (
    <div className="absolute z-[-10] flex h-full w-full flex-col items-center justify-start overflow-hidden">
      <Background jobType={jobType} />
      <DecoAura />
    </div>
  );
};
