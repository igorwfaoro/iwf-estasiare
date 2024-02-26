'use client';

import { MutableRefObject, createContext, useContext, useMemo } from 'react';
import {
  EventFormGeneralSchema,
  eventFormGeneralUseForm
} from '../forms/general';
import { EventFormDetailWeddingSchema } from '../forms/detail-wedding';
import { StepperRefType } from '../../../../components/Stepper/Stepper';

export interface INewEventProvider {
  formGeneral: ReturnType<typeof eventFormGeneralUseForm>;
  stepPrev: () => void;
  stepNext: () => void;
}

interface NewEventProviderProps {
  children: any;
  stepperRef: MutableRefObject<StepperRefType | undefined>;
}

const NewEventContext = createContext<INewEventProvider | undefined>(undefined);

const NewEventProvider = ({ children, stepperRef }: NewEventProviderProps) => {
  const formGeneral = eventFormGeneralUseForm();

  const stepPrev = () => stepperRef.current?.prev();
  const stepNext = () => stepperRef.current?.next();

  const returnValue = useMemo(
    () => ({ formGeneral, stepPrev, stepNext }),
    [formGeneral]
  );

  return (
    <NewEventContext.Provider value={returnValue}>
      {children}
    </NewEventContext.Provider>
  );
};

export default NewEventProvider;

export const useNewEventContext = () => useContext(NewEventContext)!;
