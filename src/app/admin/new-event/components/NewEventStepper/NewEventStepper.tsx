'use client';

import Stepper from '../../../../../components/Stepper/Stepper';
import { useNewEventContext } from '../../contexts/NewEventContext';

interface NewEventStepperProps {}

export default function NewEventStepper({}: NewEventStepperProps) {
  const { steps, stepperRef } = useNewEventContext();

  return (
    <Stepper steps={steps} ref={stepperRef} disableManualNavigation></Stepper>
  );
}
