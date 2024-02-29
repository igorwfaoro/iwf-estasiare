'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useLoader } from '../../../../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../../../../contexts/ToastContext';
import { useAlert } from '../../../../../../../../../contexts/AlertContext';
import { useModal } from '../../../../../../../../../contexts/ModalContext';
import { isMobile } from '../../../../../../../../../util/helpers/is-mobile.helper';
import { createHandbookClientService } from '../../../../../../../../../services/client/handbook.client-service';
import HandbookFormModal, {
  HandbookFormModalProps,
  HandbookFormModalResult
} from '../components/HandbookFormModal/HandbookFormModal';
import { EventHandbookViewModel } from '../../../../../../../../../models/view-models/event-handbook.view-model';
import { EventHandbookDetailViewModel } from '../../../../../../../../../models/view-models/event-handbook-detail.view-model';

export interface IHandbooksTabProvider {
  isLoading: boolean;
  openForm: (handbook?: EventHandbookViewModel) => Promise<void>;
  remove: (handbook: EventHandbookViewModel) => void;
  handbooks: EventHandbookViewModel[];
}

interface HandbooksTabProviderProps {
  children: any;
  eventId: number;
}

const HandbooksTabContext = createContext<IHandbooksTabProvider | undefined>(
  undefined
);

const HandbooksTabProvider = ({
  children,
  eventId
}: HandbooksTabProviderProps) => {
  const handbookService = createHandbookClientService();

  const loader = useLoader();
  const toast = useToast();
  const alert = useAlert();
  const modal = useModal();

  const [handbooks, setHandbooks] = useState<EventHandbookViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getHandbooks();
  }, []);

  const getHandbooks = () => {
    setIsLoading(true);
    handbookService
      .getAllByEvent(eventId)
      .then(setHandbooks)
      .catch((error) => {
        toast.open('Erro ao carregar manuais', 'error');
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  const getHandbookDetail = (
    id: number
  ): Promise<EventHandbookDetailViewModel> => {
    loader.show();
    return handbookService
      .getById(eventId, id)
      .catch((error) => {
        toast.open('Erro ao carregar detalhes', 'error');
        console.error(error);
        return Promise.reject(error);
      })
      .finally(() => loader.hide());
  };

  const openForm = async (handbook?: EventHandbookViewModel) => {
    let handbookDetail: EventHandbookDetailViewModel | undefined;
    if (handbook) handbookDetail = await getHandbookDetail(handbook.id);

    modal.open({
      component: HandbookFormModal,
      title: `${handbook ? 'Editar' : 'Novo'} manual`,
      props: { handbook } as HandbookFormModalProps,
      width: isMobile() ? '90%' : '50%',
      onClose: (result?: HandbookFormModalResult) => {
        if (result?.handbook) {
          const serviceApi = handbook
            ? handbookService.update(eventId, handbook.id, result.handbook)
            : handbookService.create(eventId, result.handbook);

          loader.show();
          serviceApi
            .then(() => {
              toast.open(
                `${handbook ? 'Editado' : 'Criado'} com sucesso`,
                'success'
              );
              getHandbooks();
            })
            .catch((error) => {
              toast.open(`Erro ao ${handbook ? 'editar' : 'criar'}`, 'error');
              console.error(error);
            })
            .finally(() => loader.hide());
        }
      }
    });
  };

  const remove = (handbook: EventHandbookViewModel) => {
    alert.open({
      title: 'Remover manual',
      message: 'Remover este manual?',
      buttons: [
        {
          text: 'Cancelar',
          theme: 'light'
        },
        {
          text: 'Remover',
          theme: 'danger',
          closeOnClick: false,
          onClick: (modalRef) => {
            loader.show();
            handbookService
              .remove(eventId, handbook.id)
              .then(() => {
                toast.open('Removido com sucesso', 'success');
                getHandbooks();
                modalRef.close();
              })
              .catch((error) => {
                toast.open('Erro ao remover', 'error');
                console.error(error);
              })
              .finally(() => loader.hide());
          }
        }
      ]
    });
  };

  const returnValue = useMemo(
    () => ({
      isLoading,
      openForm,
      remove,
      handbooks
    }),
    [isLoading]
  );

  return (
    <HandbooksTabContext.Provider value={returnValue}>
      {children}
    </HandbooksTabContext.Provider>
  );
};

export default HandbooksTabProvider;

export const useHandbooksTabContext = () => useContext(HandbooksTabContext)!;
