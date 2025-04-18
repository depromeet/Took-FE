import { motion, PanInfo, useAnimation, useMotionValue } from 'framer-motion';

import { convertPreviewInfo } from '@/features/share/utils/convertPreviewType';
import { cn } from '@/shared/lib/utils';

import {
  WrappedCard,
  CardAvatar,
  CardName,
  CardJob,
  CardDescription,
  CardTags,
  CardFooter,
} from '../components/BusinessCard/Card';
import { Card, JopType } from '../types';

type ActiveCardProps = {
  type: JopType;
  profileImg?: string;
  isPrimary: boolean;
  name: string;
  organization?: string;
  detailJob: string;
  introduction: string;
  tags: string[];
  previewInfoType: any;
  previewContent: {
    title?: string;
    description?: string;
    imageUrl?: string;
  };
  onClick?: () => void;
};

type DraggableCardProps = {
  card: ActiveCardProps;
  isActive: boolean;
  activeTab: number;
  cards: Card[];
  goToSharePage: (cards: Card[], activeTab: number) => void;
};
export const DraggableCard = ({ card, isActive, activeTab, cards, goToSharePage }: DraggableCardProps) => {
  const y = useMotionValue(0);
  const controls = useAnimation();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, activeTab: number) => {
    if (info.offset.y < -200) {
      controls.start({ y: -600, transition: { duration: 0.4 } });
      setTimeout(() => {
        goToSharePage(cards, activeTab);
      }, 200);
    } else {
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } });
    }
  };
  return (
    <motion.div
      {...(isActive && {
        drag: 'y',
        dragConstraints: { top: -600, bottom: 0 },
        onDragEnd: (e, info) => handleDragEnd(e, info, activeTab),
        animate: controls,
        whileDrag: { zIndex: 9999 },
        style: { y },
      })}
    >
      <WrappedCard cardType={card.type} style={{ marginBottom: '20px' }} onClick={card.onClick}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {card.isPrimary && (
            <div
              className={cn(
                'absolute right-[24px] top-[24px] rounded-full',
                card.type === 'DESIGNER' ? 'bg-opacity-purple-30' : 'bg-opacity-blue-30',
              )}
            >
              <p className="px-[8px] py-[3px] text-caption-1">대표</p>
            </div>
          )}
          <div>
            <CardAvatar src={card.profileImg || '/icon/default-image-s.svg'} alt={`${card.name}의 프로필 이미지`} />
            <CardName organization={card.organization}>{card.name}</CardName>
            <CardJob jobType={card.type}>{card.detailJob}</CardJob>
            <CardDescription>{card.introduction}</CardDescription>
          </div>
          <div>
            <CardTags tagType={card.type} tags={card.tags} />
            <CardFooter
              previewInfo={convertPreviewInfo(card.previewInfoType)}
              title={card.previewContent.title}
              description={card.previewContent.description}
              imageUrl={card.previewContent.imageUrl}
            />
          </div>
        </div>
      </WrappedCard>
    </motion.div>
  );
};
