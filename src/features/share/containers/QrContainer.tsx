'use client';

import { useState } from 'react';

import { BackgroundContainer } from './BackgroundContainer';
import { MyCardShareWithQrContainer } from './MyCardShareWithQrContainer';
import { NearbyCardShareContainer } from './NearbyCardShareContainer';
import { SegmentContainer } from './SegmentContainer';

type Params = {
  profileImg: string;
  name: string;
  job: string;
  jobType: 'DESIGNER' | 'DEVELOPER';
  url: string;
  cardId: string;
};

export const QrContainer = ({ profileImg, cardId, name, job, jobType, url }: Params) => {
  const [currentTab, setCurrentTab] = useState('myCard');

  const onClickSetCurrentTab = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <BackgroundContainer jobType={jobType} />
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
        <SegmentContainer currentTab={currentTab} setCurrentTab={onClickSetCurrentTab} />
        {currentTab === 'myCard' ? (
          <MyCardShareWithQrContainer profileImg={profileImg} name={name} job={job} jobType={jobType} url={url} />
        ) : (
          <NearbyCardShareContainer cardId={cardId} jobType={jobType} />
        )}
      </div>
    </>
  );
};
