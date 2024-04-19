'use client';

import { useEffect, useRef } from 'react';

import Stepper, {
  StepperRefType
} from '../../../../../components/Stepper/Stepper';
import { useNewEventContext } from '../../contexts/NewEventContext';

interface NewEventStepperProps {}

export default function NewEventStepper({}: NewEventStepperProps) {
  const { steps, setStepperRef } = useNewEventContext();

  const stepperRef = useRef<StepperRefType>();

  useEffect(() => {
    setStepperRef(stepperRef);
  }, []);

  return (
    <Stepper steps={steps} ref={stepperRef} disableManualNavigation></Stepper>
  );
}
