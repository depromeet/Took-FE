'use client';

import { useRouter } from 'next/navigation';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Typography } from '@/shared/ui/typography';

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

export const CardContainer = () => {
  const router = useRouter();
  const { data } = useCardQuery();

  const goToSharePage = (query: string) => {
    router.push(`/share${query}`);
  };

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
                <Typography
                  variant="caption-2"
                  style={{ marginBottom: 12 }}
                  onClick={() =>
                    goToSharePage(
                      `?profileImg=${profileImg}&name=${name}&job=${job}&jobType=${type}&url=https://www.even-took.com/share/${id}?type=mycard`,
                    )
                  }
                >
                  일단 이걸로 공유 페이지
                </Typography>
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
      {cards && (
        <div className="mx-auto mt-[30px] flex h-[40px] w-[252px] items-center justify-center gap-1 rounded-full bg-[rgba(255,255,255,0.1)] px-[14px]">
          <Typography variant="body-4">위로 스와이프해서 명함을 공유 해주세요</Typography>
        </div>
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
