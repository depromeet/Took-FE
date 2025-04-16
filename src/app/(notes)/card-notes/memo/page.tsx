import CardNotesMemo from '@/features/card-notes/ui/memo/cardNotesMemo';
import Toast from '@/shared/ui/Toast';

function Page() {
  return (
    <div className="flex h-dvh w-full">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col items-center bg-gray-black">
        <CardNotesMemo />
        <Toast />
      </div>
    </div>
  );
}
export default Page;
