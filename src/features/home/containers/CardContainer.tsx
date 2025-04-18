'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getPreviewContentByType } from '@/features/share/utils/getPreviewContent';
import { cn } from '@/shared/lib/utils';

import { AddCard } from '../components/BusinessCard/AddCard';
import { useCardQuery } from '../hooks/queries/useCardQuery';
import { Card } from '../types';

import { DraggableCard } from './DraggableCard';

// import { ClipboardContainer } from './ClipboardContainer';

export const CardContainer = () => {
  const router = useRouter();
  const { data } = useCardQuery();

  const [activeTab, setActiveTab] = useState(0);

  const goToDetailPage = (id: number) => {
    router.push(`/card-detail/${id}?type=mycard`);
  };
  const goToSharePage = (cards: Card[], activeTab: number) => {
    const encodingProfileImg = encodeURIComponent(cards[activeTab]?.imagePath);

    router.push(
      `/share?profileImg=${encodingProfileImg}&name=${cards[activeTab]?.nickname}&job=${cards[activeTab]?.detailJob}&jobType=${cards[activeTab]?.job}&url=https://www.even-took.com/card-share/${cards[activeTab].id}&cardId=${cards[activeTab].id}`,
    );
  };

  if (!data) return null;

  const { cards } = data;

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        navigation={false}
        slidesPerView={1.3}
        spaceBetween={5}
        centeredSlides={true}
        className="custom-swiper h-[425px]"
        breakpoints={{
          576: {
            slidesPerView: 1.55,
            spaceBetween: 30,
          },
        }}
      >
        {cards.map(
          (
            {
              id,
              job: type,
              imagePath: profileImg,
              isPrimary,
              nickname: name,
              organization,
              detailJob,
              summary: introduction,
              interestDomain: tags,
              previewInfo: project,
              previewInfoType,
            },
            index,
          ) => {
            const previewContent = getPreviewContentByType(project, previewInfoType);
            return (
              <SwiperSlide
                key={id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <DraggableCard
                  card={{
                    type: type,
                    profileImg: profileImg,
                    isPrimary: isPrimary,
                    name: name,
                    organization: organization,
                    detailJob: detailJob,
                    introduction: introduction,
                    tags: tags,
                    previewInfoType: previewInfoType,
                    previewContent: {
                      title: previewContent?.title,
                      description: previewContent?.description,
                      imageUrl: previewContent?.imageUrl,
                    },
                    onClick: () => goToDetailPage(id),
                  }}
                  isActive={index === activeTab}
                  activeTab={activeTab}
                  cards={cards}
                  goToSharePage={() => goToSharePage(cards, index)}
                />
              </SwiperSlide>
            );
          },
        )}
        {cards.length < 3 && (
          <SwiperSlide
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}
          >
            <AddCard />
          </SwiperSlide>
        )}
      </Swiper>
      {/* {cards && cards.length > 0 && cards[activeTab] && (
        <ClipboardContainer
          id={cards[activeTab]?.id}
          name={cards[activeTab]?.nickname}
          job={cards[activeTab]?.detailJob}
          type={cards[activeTab]?.job}
          profileImg={cards[activeTab]?.imagePath}
        />
      )} */}

      {cards && cards.length > 0 && cards[activeTab] && (
        <div className="mt-8 flex w-full items-center justify-center">
          <p
            className={cn(
              'w-fit cursor-pointer rounded-[40px] bg-opacity-white-20 px-[14px] py-[6px] text-white',
              cards[activeTab]?.job === 'DESIGNER' ? 'bg-opacity-purple-30' : 'bg-opacity-blue-40',
              'text-gray text-body-4 !font-semibold',
            )}
          >
            위로 스와이프해서 명함을 공유 해주세요
          </p>
        </div>
      )}
    </>
  );
};
