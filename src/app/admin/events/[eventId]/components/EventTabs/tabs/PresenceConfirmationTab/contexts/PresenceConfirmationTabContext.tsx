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
import { useAdminEventPageContext } from '../../../../../contexts/AdminEventPageContext';
import { createInvitationClientService } from '../../../../../../../../../services/client/invitation.client-service';
import { InvitationViewModel } from '../../../../../../../../../models/view-models/invitation.view-model';
import InvitationFormModal, {
  InvitationFormModalProps,
  InvitationFormModalResult
} from '../components/InvitationFormModal/InvitationFormModal';
import { InvitationInputModel } from '../../../../../../../../../models/input-models/invitation-create.input-model';
import { InvitationDetailViewModel } from '../../../../../../../../../models/view-models/invitation-detail.view-model';

export interface IPresenceConfirmationTabProvider {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  openForm: (invitationId?: number) => void;
  remove: (invitationId: number) => void;
  filteredInvitations: InvitationViewModel[];
}

interface PresenceConfirmationTabProviderProps {
  children: any;
}

const PresenceConfirmationTabContext = createContext<
  IPresenceConfirmationTabProvider | undefined
>(undefined);

const PresenceConfirmationTabProvider = ({
  children
}: PresenceConfirmationTabProviderProps) => {
  const { event } = useAdminEventPageContext();

  const invitationService = createInvitationClientService();

  const loader = useLoader();
  const toast = useToast();
  const alert = useAlert();
  const modal = useModal();

  const [search, setSearch] = useState<string>('');
  const [invitations, setInvitations] = useState<InvitationViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (event) getInvitations();
  }, [event]);

  const getInvitations = () => {
    setIsLoading(true);
    invitationService
      .getAllByEvent(event!.id)
      .then(setInvitations)
      .catch((error) => {
        toast.open('Erro ao carregar convites', 'error');
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  const openForm = async (invitationId?: number) => {
    let invitation: InvitationDetailViewModel | undefined = undefined;
    if (invitationId) {
      try {
        loader.show();
        invitation = await invitationService.getById(event!.id, invitationId);
      } catch (error) {
        toast.open('Erro ao carregar convite', 'error');
        console.error(error);
      } finally {
        loader.hide();
      }
    }

    modal.open({
      component: InvitationFormModal,
      title: `${invitationId ? 'Editar' : 'Novo'} convite`,
      props: { invitation } as InvitationFormModalProps,
      width: isMobile() ? '90%' : '50%',
      onClose: (result?: InvitationFormModalResult) => {
        if (result?.invitation) saveInvitation(result.invitation, invitationId);
      }
    });
  };

  const saveInvitation = (
    invitation: InvitationInputModel,
    invitationId?: number
  ) => {
    const serviceApi = invitationId
      ? invitationService.update(event!.id, invitationId, invitation)
      : invitationService.create(event!.id, invitation);

    loader.show();
    serviceApi
      .then(() => {
        toast.open(
          `${invitation ? 'Editado' : 'Criado'} com sucesso`,
          'success'
        );
        getInvitations();
      })
      .catch((error) => {
        toast.open(`Erro ao ${invitation ? 'editar' : 'criar'}`, 'error');
        console.error(error);
      })
      .finally(() => loader.hide());
  };

  const remove = (invitationId: number) => {
    alert.open({
      title: 'Remover convite',
      message: 'Remover este convite?',
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
            invitationService
              .remove(event!.id, invitationId)
              .then(() => {
                toast.open('Removido com sucesso', 'success');
                getInvitations();
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

  const filteredInvitations = invitations.filter((invitation) =>
    invitation.description.toLowerCase().includes(search.toLowerCase())
  );

  const returnValue = useMemo(
    () => ({
      search,
      setSearch,
      isLoading,
      openForm,
      remove,
      filteredInvitations
    }),
    [search, isLoading, filteredInvitations]
  );

  return (
    <PresenceConfirmationTabContext.Provider value={returnValue}>
      {children}
    </PresenceConfirmationTabContext.Provider>
  );
};

export default PresenceConfirmationTabProvider;

export const usePresenceConfirmationTabContext = () =>
  useContext(PresenceConfirmationTabContext)!;
