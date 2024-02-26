'use client';

import StepGeneral from './steps/StepGeneral/StepGeneral';
import StepDetails from './steps/StepDetails/StepDetails';
import NewEventProvider from '../../contexts/NewEventContext';
import Stepper, {
  Step,
  StepperRefType
} from '../../../../../components/Stepper/Stepper';
import { useRef } from 'react';
import StepAddress from './steps/StepAddress/StepAddress';

interface NewEventStepperProps {}

const steps = [
  { label: 'Evento', component: <StepGeneral /> },
  { label: 'Endereço', component: <StepAddress /> },
  { label: 'Detalhes', component: <StepDetails /> }
];

export default function NewEventStepper({}: NewEventStepperProps) {
  const stepperRef = useRef<StepperRefType>();

  return (
    <NewEventProvider stepperRef={stepperRef}>
      <Stepper ref={stepperRef}>
        {steps.map((step, i) => (
          <Step key={i} label={step.label}>
            {step.component}
          </Step>
        ))}
      </Stepper>
    </NewEventProvider>
  );
}
