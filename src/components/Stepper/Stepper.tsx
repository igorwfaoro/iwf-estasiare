import {
  Dispatch,
  ReactElement,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';
import StepperStep, { StepperStepProps } from './components/Step/Step';
import { twMerge } from 'tailwind-merge';

interface StepperProps {
  children: ReactElement<StepperStepProps>[];
  initialIndex?: number;
  labelClassName?: string;
}

export interface StepperRefType {
  next: () => void;
  prev: () => void;
  setIndex: Dispatch<SetStateAction<number>>;
}

const Stepper = forwardRef(
  ({ children: steps, initialIndex, labelClassName }: StepperProps, ref) => {
    const [index, setIndex] = useState(initialIndex || 0);

    useImperativeHandle(ref, () => ({
      next: handleNext,
      prev: handlePrev,
      setIndex
    }));

    const handleNext = () => setIndex((curr) => curr + 1);
    const handlePrev = () => setIndex((curr) => curr - 1);

    const step = steps[index];

    const labels = steps.map((s) => s.props.label);

    return (
      <div>
        <div className="flex gap-4 justify-between items-center w-full">
          {labels.map((l, i) => (
            <div key={i} className='contents'>
              <button
                onClick={() => setIndex(i)}
                className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-200 p-2 rounded-xl"
              >
                <div className="bg-primary text-white p-1 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {i + 1}
                </div>

                <div>{l}</div>
              </button>

              {i < labels.length - 1 && (
                <div className="w-full h-[1px] bg-gray-300" />
              )}
            </div>
          ))}
        </div>

        <div>{step}</div>
      </div>
    );
  }
);

export default Stepper;

export const Step = StepperStep;
