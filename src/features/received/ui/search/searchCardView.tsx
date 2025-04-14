import ReceivedCardList from '../receivedCardList';

type SearchCardViewProps = {
  searchValue: string;
};

export default function SearchCardView({ searchValue }: SearchCardViewProps) {
  return <ReceivedCardList selectedFolderId={null} searchValue={searchValue} />;
}
