'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { useCardFormStore } from '@/shared/store/cardFormState';
import { List } from '@/shared/ui/list';
import WrappedListItem from '@/shared/ui/list/wrappedList';

import { CAREER_SELECT, ROUTE_PATH } from '../config';

function NewCreateCardView() {
  const setJob = useCardFormStore((state) => state.setJob);
  const router = useRouter();

  const handleCreateDesignCard = () => {
    router.push(ROUTE_PATH.DESIGNER);
    setJob('DESIGNER');
  };

  const handleCreateDevCard = () => {
    router.push(ROUTE_PATH.DEVELOPER);
    setJob('DEVELOPER');
  };

  return (
    <main className={cn('flex flex-col', spacingStyles({ paddingX: 'ml', paddingY: 'lg' }))}>
      <header className="flex flex-col gap-3">
        <h1 className="text-title-1 text-gray-white">{CAREER_SELECT.title}</h1>
        <p className="text-body-3 text-gray-400">{CAREER_SELECT.description}</p>
      </header>
      <section className={cn(spacingStyles({ marginTop: 'xl' }))}>
        <List>
          <WrappedListItem leftIcon="design" text={CAREER_SELECT.listText.design} onClick={handleCreateDesignCard} />
          <WrappedListItem leftIcon="dev" text={CAREER_SELECT.listText.dev} onClick={handleCreateDevCard} />
        </List>
      </section>
    </main>
  );
}

export default NewCreateCardView;
