import React, { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { PreviewInfo } from '@/features/share/types';

import {
  WrappedCard,
  ShareCardAvatar,
  ShareCardName,
  ShareCardJob,
  ShareCardDescription,
  ShareCardTags,
  ShareCardFooter,
} from '../components/Card';
import { Card, JopType, PreviewInfoType } from '../types';
import { convertPreviewInfo } from '../utils/convertPreviewType';
import { getPreviewContentByType } from '../utils/getPreviewContent';

type CardNotesCardProps = {
  cards: Card[];
};

function CardNotesCard({ cards }: CardNotesCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const getPreviewContent = (card: Card) => {
    if (!card?.previewInfo || !card?.previewInfoType) return {};

    const previewInfo = card.previewInfo as PreviewInfo;
    const type = card.previewInfoType.toUpperCase();

    return getPreviewContentByType(previewInfo, type);
  };

  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {cards.map((card) => {
          const previewContent = getPreviewContent(card);

          return (
            <SwiperSlide
              key={card.id}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}
            >
              <WrappedCard
                cardType={card?.job as JopType}
                style={{
                  marginBottom: '20px',
                }}
              >
                <ShareCardAvatar
                  src={card?.imagePath || '/icons/avatarIcon.png'}
                  alt={`${card?.nickname}의 프로필 이미지`}
                />
                <ShareCardName organization={card?.organization}>{card?.nickname}</ShareCardName>
                <ShareCardJob jobType={card?.job as JopType}>{card?.detailJob}</ShareCardJob>
                <ShareCardDescription>{card?.summary}</ShareCardDescription>
                <ShareCardTags tagType={card?.job as JopType} tags={card?.interestDomain || []} />
                <ShareCardFooter
                  previewInfo={convertPreviewInfo(card?.previewInfoType as PreviewInfoType)}
                  title={previewContent.title}
                  description={previewContent.description}
                  imageUrl={previewContent.imageUrl}
                />
              </WrappedCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default CardNotesCard;
