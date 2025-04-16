import CardDetail from '@/features/card-detail/ui/cardDetail';
import { ErrorFallback } from '@/shared/ui/error-boundary/ErrorFallback';
import ErrorHandlingWrapper from '@/shared/ui/error-boundary/ErrorHandlingWrapper';

function Page() {
  return (
    <div className="flex h-dvh w-full">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center bg-gray-black">
        <ErrorHandlingWrapper fallbackComponent={ErrorFallback}>
          <CardDetail />
        </ErrorHandlingWrapper>
      </div>
    </div>
  );
}

export default Page;
