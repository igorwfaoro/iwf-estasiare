'use client';

import { MutableRefObject, createContext, useContext, useMemo } from 'react';
import { StepperRefType } from '../../../../components/Stepper/Stepper';

export interface INewEventProvider {
  stepPrev: () => void;
  stepNext: () => void;
}

interface NewEventProviderProps {
  children: any;
  stepperRef: MutableRefObject<StepperRefType | undefined>;
}

const NewEventContext = createContext<INewEventProvider | undefined>(undefined);

const NewEventProvider = ({ children, stepperRef }: NewEventProviderProps) => {

  const [generalData, setGeneralData]

  const stepPrev = () => stepperRef.current?.prev();
  const stepNext = () => stepperRef.current?.next();

  const returnValue = useMemo(
    () => ({ stepPrev, stepNext }),
    []
  );

  return (
    <NewEventContext.Provider value={returnValue}>
      {children}
    </NewEventContext.Provider>
  );
};

export default NewEventProvider;

export const useNewEventContext = () => useContext(NewEventContext)!;
