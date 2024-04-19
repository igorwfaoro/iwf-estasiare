import classNames from 'classnames';
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';
import { twMerge } from 'tailwind-merge';

export interface StepItem {
  label?: string;
  complete?: boolean;
  component: ReactElement;
}

interface StepperProps {
  steps: StepItem[];
  initialIndex?: number;
  disableManualNavigation?: boolean;
}

export interface StepperRefType {
  next: () => void;
  prev: () => void;
  setIndex: Dispatch<SetStateAction<number>>;
  setStepComplete: (index: number, value: boolean) => void;
}

const Stepper = forwardRef(
  (
    {
      steps,
      initialIndex,
      disableManualNavigation: disableNavigation
    }: StepperProps,
    ref
  ) => {
    const [index, setIndex] = useState(initialIndex || 0);

    useImperativeHandle(ref, () => ({
      next: handleNext,
      prev: handlePrev,
      setIndex
    }));

    const handleNext = () => setIndex((curr) => curr + 1);
    const handlePrev = () => setIndex((curr) => curr - 1);

    const currentStep = steps[index];

    return (
      <div>
        <div className="flex gap-2 md:gap-4 justify-between items-center w-full">
          {steps.map((step, i) => (
            <div key={i} className="contents">
              <button
                onClick={() => !disableNavigation && setIndex(i)}
                className="flex flex-col md:flex-row items-center gap-2 text-gray-500 text-sm hover:bg-gray-200 p-2 rounded-xl"
                style={{ width: `${100 / steps.length}%` }}
              >
                <div
                  className={twMerge(
                    'bg-gray-300 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center font-bold',
                    classNames({
                      'bg-primary': i === index || step.complete
                    })
                  )}
                >
                  {i + 1}
                </div>

                <div
                  className={twMerge(
                    '',
                    classNames({ 'font-bold': i === index })
                  )}
                >
                  {step.label}
                </div>
              </button>

              {i < steps.length - 1 && (
                <div className="hidden md:block w-full h-[1px] bg-gray-300" />
              )}
            </div>
          ))}
        </div>

        <div>{currentStep.component}</div>
      </div>
    );
  }
);

export default Stepper;
