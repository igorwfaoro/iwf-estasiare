'use client';

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';
import {
  StepItem,
  StepperRefType
} from '../../../../components/Stepper/Stepper';
import { EventCreateInputModel } from '../../../../models/input-models/event-create.input-model';
import { createEventClientService } from '../../../../services/client/event.client-service';
import { useLoader } from '../../../../contexts/LoaderContext';
import { useToast } from '../../../../contexts/ToastContext';
import { useRouter } from 'next/navigation';
import StepGeneral from '../components/NewEventStepper/steps/StepGeneral/StepGeneral';
import StepDetails from '../components/NewEventStepper/steps/StepDetails/StepDetails';
import StepContent from '../components/NewEventStepper/steps/StepContent/StepContent';
import StepConfirm from '../components/NewEventStepper/steps/StepConfirm/StepConfirm';

export interface INewEventProvider {
  stepperRef: MutableRefObject<StepperRefType | undefined> | undefined;
  setStepperRef: Dispatch<
    SetStateAction<MutableRefObject<StepperRefType | undefined> | undefined>
  >;
  steps: StepItem[];
  stepPrev: () => void;
  stepNext: () => void;
  setStepComplete: (index: number) => void;
  eventCreateData: Partial<EventCreateInputModel> | undefined;
  setEventCreateData: Dispatch<
    SetStateAction<Partial<EventCreateInputModel> | undefined>
  >;
  create: () => void;
}

interface NewEventProviderProps {
  children: any;
}

const NewEventContext = createContext<INewEventProvider | undefined>(undefined);

const NewEventProvider = ({ children }: NewEventProviderProps) => {
  const eventClientService = createEventClientService();

  const loader = useLoader();
  const toast = useToast();
  const router = useRouter();

  const [stepperRef, setStepperRef] =
    useState<MutableRefObject<StepperRefType | undefined>>();

  const [steps, setSteps] = useState<StepItem[]>([
    {
      label: 'Evento',
      component: <StepGeneral index={0} />
    },
    {
      label: 'Design',
      component: <StepContent index={1} />
    },
    {
      label: 'Detalhes',
      component: <StepDetails index={2} />
    },
    {
      label: 'Confirmação',
      component: <StepConfirm index={3} />
    }
  ]);

  const [eventCreateData, setEventCreateData] =
    useState<Partial<EventCreateInputModel>>();

  const stepPrev = () => stepperRef!.current?.prev();
  const stepNext = () => stepperRef!.current?.next();

  const setStepComplete = (index: number) => {
    setSteps((curr) => {
      curr[index].complete = true;
      return curr;
    });
  };

  const create = () => {
    loader.show();
    eventClientService
      .create(eventCreateData as EventCreateInputModel)
      .then((response) => {
        toast.open('Evento criado!', 'success');
        router.push(`/admin/events/${response.id}`);
      })
      .catch((error) => {
        toast.open('Erro ao criar evento :(', 'error');
        console.error(error);
      })
      .finally(() => loader.hide());
  };

  const returnValue = useMemo(
    () => ({
      stepperRef,
      setStepperRef,
      steps,
      stepPrev,
      stepNext,
      setStepComplete,
      eventCreateData,
      setEventCreateData,
      create
    }),
    [stepperRef, eventCreateData, steps]
  );

  return (
    <NewEventContext.Provider value={returnValue}>
      {children}
    </NewEventContext.Provider>
  );
};

export default NewEventProvider;

export const useNewEventContext = () => useContext(NewEventContext)!;
