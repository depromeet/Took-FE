import CardDetail from '@/features/card-detail/ui/cardDetail';

function Page() {
  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center bg-gray-black">
        <CardDetail />
      </div>
    </div>
  );
}

export default Page;
