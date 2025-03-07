import FirstStep from './firstStep';
import ThirdStep from './thridStep';
import TwoStep from './twoStep';

type CareerFormViewProps = {
  currentStep: number;
}

// 스텝에 따른 Fomr 컴포넌트를 렌더링하는 컴포넌트
const StepFormView = ({ currentStep }: { currentStep: number }) => {
  const stepComponents: Record<number, JSX.Element> = {
    1: <FirstStep />,
    2: <TwoStep />,
    3: <ThirdStep />,
  };

  return stepComponents[currentStep] || <></>;
}

function CareerFormView({ currentStep }: CareerFormViewProps) {
  return (
    <>
      <StepFormView currentStep={currentStep} />
    </>
  )
}

export default CareerFormView;