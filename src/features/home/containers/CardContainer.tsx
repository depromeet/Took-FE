'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AddCard } from '../components/BusinessCard/AddCard';
import {
  CardAvatar,
  CardDescription,
  CardFooter,
  CardJob,
  CardName,
  CardTags,
  WrappedCard,
} from '../components/BusinessCard/Card';
import { useCardQuery } from '../hooks/queries/useCardQuery';
import { PreviewInfoType } from '../types';

import { ClipboardContainer } from './ClipboardContainer';

export const CardContainer = () => {
  const router = useRouter();
  const { data } = useCardQuery();

  const [activeTab, setActiveTab] = useState(0);

  const goToDetailPage = (id: number) => {
    router.push(`/card-detail/${id}`);
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
        className="home-swiper h-[440px]"
      >
        {cards.map(
          ({
            id,
            job: type,
            imagePath: profileImg,
            nickname: name,
            organization,
            job,
            summary: introduction,
            interestDomain: tags,
            previewInfo: project,
            previewInfoType,
          }) => {
            return (
              <SwiperSlide
                key={id}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <WrappedCard cardType={type} style={{ marginBottom: '20px' }} onClick={() => goToDetailPage(id)}>
                  <CardAvatar src={`${profileImg}`} alt={`${name}의 프로필 이미지`} />
                  <CardName organization={organization}>{name}</CardName>
                  <CardJob jobType={type}>{job}</CardJob>
                  <CardDescription>{introduction}</CardDescription>
                  <CardTags tagType={type} tags={tags} />
                  <CardFooter
                    previewInfo={convertPreviewInfo(previewInfoType)}
                    title={project.project?.title}
                    description={project.project?.description}
                    imageUrl={project.project?.imageUrl}
                  />
                </WrappedCard>
              </SwiperSlide>
            );
          },
        )}
        {cards.length < 3 && (
          <SwiperSlide
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <AddCard />
          </SwiperSlide>
        )}
      </Swiper>
      {cards && cards.length > 0 && (
        <ClipboardContainer
          id={cards[activeTab].id}
          name={cards[activeTab].nickname}
          job={cards[activeTab].job}
          type={cards[activeTab].job}
          profileImg={cards[activeTab].imagePath}
        />
      )}
    </>
  );
};

const convertPreviewInfo = (previewInfo: PreviewInfoType) => {
  return {
    PROJECT: '대표 프로젝트',
    CONTENT: '작성한 글',
    HOBBY: '취미',
    SNS: 'SNS',
    NEWS: '최근 소식',
    REGION: '활동 지역',
  }[previewInfo];
};
