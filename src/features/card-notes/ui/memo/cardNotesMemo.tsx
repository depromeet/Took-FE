import CardNotesMemoHeader from './cardNotesMemoHeader';
import CardNotesMemoMain from './cardNotesMemoMain';

function CardNotesMemo() {
  return (
    <div className="flex w-full flex-col">
      <CardNotesMemoHeader />
      <div className={'h-[calc(100dvh-64px)] overflow-y-auto scrollbar-hide'}>
        <CardNotesMemoMain />
      </div>
    </div>
  );
}

export default CardNotesMemo;
