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

import AlertProvider, {
  useAlert
} from '../../../../../../../../../contexts/AlertContext';
import { useLoader } from '../../../../../../../../../contexts/LoaderContext';
import { useModal } from '../../../../../../../../../contexts/ModalContext';
import { useToast } from '../../../../../../../../../contexts/ToastContext';
import { GiftViewModel } from '../../../../../../../../../models/view-models/gift.view-model';
import { createGiftClientService } from '../../../../../../../../../services/client/gift.client-service';
import { isMobile } from '../../../../../../../../../util/helpers/is-mobile.helper';
import { useAdminEventPageContext } from '../../../../../contexts/AdminEventPageContext';
import EventFinancialEditModal, {
  EventFinancialEditModalProps,
  EventFinancialEditModalResult
} from '../../EventInfoTab/edit-modals/EventFinancialEditModal/EventFinancialEditModal';
import GiftFormModal, {
  GiftFormModalProps,
  GiftFormModalResult
} from '../components/GiftFormModal/GiftFormModal';
import GiftRegistriesModal from '../components/GiftRegistriesModal/GiftRegistriesModal';

export interface IGiftsTabProvider {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  showEmptyFinancialInfoMessage: boolean;
  handleOpenFinancialInfo: () => void;
  openForm: (gift?: GiftViewModel) => void;
  remove: (gift: GiftViewModel) => void;
  filteredGifts: GiftViewModel[];
  handleOpenGiftRegistriesModal: () => void;
}

interface GiftsTabProviderProps {
  children: any;
}

const GiftsTabContext = createContext<IGiftsTabProvider | undefined>(undefined);

const GiftsTabProvider = ({ children }: GiftsTabProviderProps) => {
  const { event } = useAdminEventPageContext();

  const giftService = createGiftClientService();

  const loader = useLoader();
  const toast = useToast();
  const alert = useAlert();
  const modal = useModal();

  const [search, setSearch] = useState<string>('');
  const [gifts, setGifts] = useState<GiftViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showEmptyFinancialInfoMessage, setShowEmptyFinancialInfoMessage] =
    useState(false);

  useEffect(() => {
    const hasFinancialInfo = !!event?.financial?.paypalBusinessCode;
    setShowEmptyFinancialInfoMessage(!hasFinancialInfo);
    if (hasFinancialInfo) getGifts();
  }, [event]);

  const getGifts = () => {
    setIsLoading(true);
    giftService
      .getAllByEvent(event!.id)
      .then(setGifts)
      .catch((error) => {
        toast.open('Erro ao carregar lista de presentes', 'error');
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleOpenFinancialInfo = () => {
    modal.open({
      component: EventFinancialEditModal,
      title: 'Informações Financeiras',
      props: { event } as EventFinancialEditModalProps,
      width: isMobile() ? '90%' : '50%',
      onClose: (result: EventFinancialEditModalResult) => {
        if (result.edited) {
          setShowEmptyFinancialInfoMessage(false);
          getGifts();
        }
      }
    });
  };

  const handleOpenGiftRegistriesModal = () => {
    modal.open({
      component: GiftRegistriesModal,
      title: 'Listas de presentes',
      props: { event } as EventFinancialEditModalProps,
      width: isMobile() ? '90%' : '60%',
      providers: [{ Component: AlertProvider }]
    });
  };

  const openForm = (gift?: GiftViewModel) => {
    modal.open({
      component: GiftFormModal,
      title: `${gift ? 'Editar' : 'Novo'} presente`,
      props: { gift } as GiftFormModalProps,
      width: isMobile() ? '90%' : '50%',
      onClose: (result?: GiftFormModalResult) => {
        if (result?.data) {
          const serviceApi = gift
            ? giftService.update(
                event!.id,
                gift.id,
                result.data.gift,
                result.data.imageFile
              )
            : giftService.create(
                event!.id,
                result.data.gift,
                result.data.imageFile
              );

          loader.show();
          serviceApi
            .then(() => {
              toast.open(
                `${gift ? 'Editado' : 'Criado'} com sucesso`,
                'success'
              );
              getGifts();
            })
            .catch((error) => {
              toast.open(`Erro ao ${gift ? 'editar' : 'criar'}`, 'error');
              console.error(error);
            })
            .finally(() => loader.hide());
        }
      }
    });
  };

  const remove = (gift: GiftViewModel) => {
    alert.open({
      title: 'Remover presente',
      message: 'Remover este presente?',
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
            giftService
              .remove(event!.id, gift.id)
              .then(() => {
                toast.open('Removido com sucesso', 'success');
                getGifts();
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

  const filteredGifts = gifts.filter((gift) =>
    gift.description.toLowerCase().includes(search.toLowerCase())
  );

  const returnValue = useMemo(
    () => ({
      search,
      setSearch,
      isLoading,
      showEmptyFinancialInfoMessage,
      handleOpenFinancialInfo,
      openForm,
      remove,
      filteredGifts,
      handleOpenGiftRegistriesModal
    }),
    [search, isLoading, showEmptyFinancialInfoMessage, filteredGifts]
  );

  return (
    <GiftsTabContext.Provider value={returnValue}>
      {children}
    </GiftsTabContext.Provider>
  );
};

export default GiftsTabProvider;

export const useGiftsTabContext = () => useContext(GiftsTabContext)!;
