import CardNotesHeader from './cardNotesHeader';
import CardNotesMain from './cardNotesMain';

function CardNotes() {
  return (
    <div className="flex w-full flex-col">
      <CardNotesHeader />
      <CardNotesMain />
    </div>
  );
}

export default CardNotes;
