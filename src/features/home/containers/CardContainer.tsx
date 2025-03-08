'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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

export const CardContainer = () => {
  const { data } = useCardQuery();

  return (
    <Swiper pagination modules={[Pagination]} className="h-[440px]">
      {data.map(({ id, type, profileImg, name, organization, job, introduction, tags, project }) => {
        return (
          <SwiperSlide key={id}>
            <WrappedCard cardType={type} style={{ marginBottom: '20px' }}>
              <CardAvatar src={profileImg} alt={`${name}의 프로필 이미지`} />
              <CardName organization={organization}>{name}</CardName>
              <CardJob jobType={type}>{job}</CardJob>
              <CardDescription>{introduction}</CardDescription>
              <CardTags tagType={type} tags={tags} />
              <CardFooter
                footerTitle={project.footerTitle}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
              />
            </WrappedCard>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
