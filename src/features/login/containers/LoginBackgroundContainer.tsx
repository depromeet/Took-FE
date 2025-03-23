import { Background } from '../components/Background';
import { DecoAura } from '../components/DecoAura';
import { DecoDesignerCircle } from '../components/DecoDesignerCircle';
import { DecoDesignerLogo } from '../components/DecoDesignerLogo';
import { DecoDeveloperCircle } from '../components/DecoDeveloperCircle';
import { DecoDeveloperLogo } from '../components/DecoDeveloperLogo';
import { TookLogo } from '../components/TookLogo';

export const LoginBackgroundContainer = () => {
  return (
    <div className="absolute top-0 h-dvh w-full">
      <Background className="absolute top-0" />
      <div className="absolute top-0 w-full">
        <div className="relative top-[360px] flex items-center justify-center">
          <div className="absolute top-[-252px] flex items-center justify-center">
            <DecoDeveloperCircle className="absolute" />
            <DecoDeveloperLogo className="absolute opacity-40" />
          </div>
          <DecoAura className="absolute" />
          <DecoDesignerCircle className="absolute" />
          <DecoDesignerLogo className="absolute" />
          <TookLogo className="absolute top-[-160px]" />
        </div>
      </div>
      <div className="absolute top-0 z-10 h-[180px] w-[600px] bg-gradient-to-b from-[#0f0f13] to-transparent" />
    </div>
  );
};
