'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import SNS_CONFIG from '@/features/card-detail/config/sns-config';
import { PreviewInfo } from '@/features/share/types';

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
    router.push(`/card-detail/${id}?type=mycard`);
  };

  if (!data) return null;

  const { cards } = data;

  const getPreviewContent = (previewInfoType: string, project: PreviewInfo) => {
    switch (previewInfoType) {
      case 'PROJECT':
        return project.project
          ? {
              title: project.project.title,
              description: project.project.description,
              imageUrl: project.project.imageUrl,
            }
          : {};
      case 'CONTENT':
        return project.content
          ? {
              title: project.content?.title,
              description: project.content?.description,
              imageUrl: project.content?.imageUrl,
            }
          : {};
      case 'SNS':
        return project.sns
          ? {
              title: project.sns.type,
              description: project.sns.link,
              imageUrl: SNS_CONFIG[project.sns.type as keyof typeof SNS_CONFIG]?.iconPath || '/icons/imageIcon.svg',
            }
          : {};
      case 'HOBBY':
        return project.hobby
          ? {
              title: project.hobby,
              description: '',
            }
          : {};
      case 'NEWS':
        return project.news
          ? {
              title: project.news,
              description: '',
            }
          : {};
      case 'REGION':
        return project.region
          ? {
              title: project.region,
              description: '',
            }
          : {};
      default:
        return {};
    }
  };

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        className="home-swiper h-[420px]"
      >
        {cards.map(
          ({
            id,
            job: type,
            imagePath: profileImg,
            nickname: name,
            organization,
            detailJob,
            summary: introduction,
            interestDomain: tags,
            previewInfo: project,
            previewInfoType,
          }) => {
            const previewContent = getPreviewContent(previewInfoType, project);
            return (
              <SwiperSlide
                key={id}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}
              >
                <WrappedCard
                  cardType={type}
                  style={{
                    marginBottom: '20px',
                  }}
                  onClick={() => goToDetailPage(id)}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <div>
                      <CardAvatar
                        src={profileImg || '/icon/default-image-s.svg'}
                        alt={`${name}의 프로필 이미지`}
                      />
                      <CardName organization={organization}>{name}</CardName>
                      <CardJob jobType={type}>{detailJob}</CardJob>
                      <CardDescription>{introduction}</CardDescription>
                    </div>
                    <div>
                      <CardTags tagType={type} tags={tags} />
                      <CardFooter
                        previewInfo={convertPreviewInfo(previewInfoType)}
                        title={previewContent.title}
                        description={previewContent.description}
                        imageUrl={previewContent.imageUrl}
                      />
                    </div>
                  </div>
                </WrappedCard>
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
      {cards && cards.length > 0 && cards[activeTab] && (
        <ClipboardContainer
          id={cards[activeTab]?.id}
          name={cards[activeTab]?.nickname}
          job={cards[activeTab]?.detailJob}
          type={cards[activeTab]?.job}
          profileImg={cards[activeTab]?.imagePath}
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
