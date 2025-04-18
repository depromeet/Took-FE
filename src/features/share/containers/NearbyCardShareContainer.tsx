import { LoaderIcon } from 'lucide-react';

import EmptyPeople from '../components/EmptyPeople';
import { NearbyProfile } from '../components/NearbyProfile';
import { useNearbyCardsQuery } from '../hooks/queries/useNearbyCardQuery';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

type Params = {
  jobType: 'DESIGNER' | 'DEVELOPER';
  cardId: string;
};

export const NearbyCardShareContainer = ({ cardId, jobType }: Params) => {
  const { location } = useCurrentLocation();

  const { data, isLoading } = useNearbyCardsQuery(location?.latitude, location?.longitude);

  const backgroundStyle = {
    backgroundColor: jobType === 'DEVELOPER' ? 'rgba(12, 109, 255, 0.4)' : 'rgba(92, 45, 255, 0.4)',
  };

  console.log(data?.profiles.length);

  return (
    <>
      <div
        className="flex h-[478px] w-[320px] flex-col items-center gap-2 overflow-y-scroll rounded-[24px] px-[18px] pb-10 pt-[28px] backdrop-blur-xl"
        style={backgroundStyle}
      >
        {isLoading && <LoaderIcon className="animate-spin" />}
        {data?.profiles.length == 0 && <EmptyPeople />}

        {data?.profiles.map(({ userId, nickname, name, detailJobEn, imagePath }) => (
          <NearbyProfile
            key={cardId}
            cardId={Number(cardId)}
            userId={userId}
            profileImg={imagePath}
            name={nickname ?? name ?? ''}
            jobDetail={detailJobEn}
          />
        ))}
      </div>
      <div className="mt-[24px] h-[36px]" />
    </>
  );
};
