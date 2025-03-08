import CardDetailHeader from '@/features/card-detail/ui/cardDetailHeader';
import CardTabs from '@/features/card-detail/ui/cardTabs';

function Page() {
  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center">
        <CardDetailHeader />
        <CardTabs />
      </div>
    </div>
  );
}

export default Page;
