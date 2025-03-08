"use client";

import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import { List } from '@/shared/ui/list';
import WrappedListItem from '@/shared/ui/list/wrappedList';

import { ONBOARDING_CARD_CREATE, ROUTE_PATH } from '../config';

function OnBoardingView() {
  const router = useRouter();

  // 새로운 명함 만들기
  const handleCreateNewCard = () => {
    router.push(ROUTE_PATH.newCard);
  };

  // 기존 명함 수정해서 새로 만들기
  const handleModifyExistingCard = () => {
    router.push(ROUTE_PATH.modifyCard);
  };

  return (
    <>
      <main className={cn('flex flex-col', spacingStyles({ paddingX: 'ml', paddingY: 'lg' }))}>
        <header className='flex flex-col gap-3'>
          <h1 className='text-title-1 text-gray-white'>{ONBOARDING_CARD_CREATE.title}</h1>
          <p className='text-body-3 text-gray-400'>{ONBOARDING_CARD_CREATE.description}</p>
        </header>
        <section className={cn(spacingStyles({ marginTop: 'xl' }))}>
          <List>
            <WrappedListItem text={ONBOARDING_CARD_CREATE.listText.createNewCard} onClick={handleCreateNewCard} />
            <WrappedListItem text={ONBOARDING_CARD_CREATE.listText.modifyExistingCard} onClick={handleModifyExistingCard} />
          </List>
        </section>
      </main>
    </>
  )
}

export default OnBoardingView;