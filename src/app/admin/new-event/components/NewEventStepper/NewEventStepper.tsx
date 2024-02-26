'use client';

import {
  useNewEventContext
} from '../../contexts/NewEventContext';
import Stepper, {
  StepperRefType
} from '../../../../../components/Stepper/Stepper';
import { useEffect, useRef } from 'react';

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
