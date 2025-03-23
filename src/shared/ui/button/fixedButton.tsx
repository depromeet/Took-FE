import { Button } from '../button';

type FixedButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  title: string;
};

const FixedButton = ({ onClick, disabled, title }: FixedButtonProps) => {
  return (
    <div className="fixed bottom-5 left-0 right-0 z-10 mx-auto w-full max-w-[600px] px-5">
      <Button className="w-full" onClick={onClick} disabled={disabled}>
        {title}
      </Button>
    </div>
  );
};

export default FixedButton;
