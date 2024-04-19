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

import { useAlert } from '../../../../../../../../../contexts/AlertContext';
import { useLoader } from '../../../../../../../../../contexts/LoaderContext';
import { useModal } from '../../../../../../../../../contexts/ModalContext';
import { useToast } from '../../../../../../../../../contexts/ToastContext';
import { InvitationInputModel } from '../../../../../../../../../models/input-models/invitation-create.input-model';
import { InvitationDetailViewModel } from '../../../../../../../../../models/view-models/invitation-detail.view-model';
import { InvitationViewModel } from '../../../../../../../../../models/view-models/invitation.view-model';
import { createInvitationClientService } from '../../../../../../../../../services/client/invitation.client-service';
import { isMobile } from '../../../../../../../../../util/helpers/is-mobile.helper';
import { useAdminEventPageContext } from '../../../../../contexts/AdminEventPageContext';
import InvitationFormModal, {
  InvitationFormModalProps,
  InvitationFormModalResult
} from '../components/InvitationFormModal/InvitationFormModal';

export interface IInvitationsTabProvider {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  openForm: (invitationId?: number) => void;
  remove: (invitationId: number) => void;
  filteredInvitations: InvitationViewModel[];
  totalGuestsCount: number;
  totalGuestsConfirmed: number;
}

interface InvitationsTabProviderProps {
  children: any;
}

const InvitationsTabContext = createContext<
  IInvitationsTabProvider | undefined
>(undefined);

const InvitationsTabProvider = ({ children }: InvitationsTabProviderProps) => {
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

  const totalGuestsCount = invitations.reduce(
    (acc, invitation) => acc + invitation.guestsCount!,
    0
  );

  const totalGuestsConfirmed = invitations.reduce(
    (acc, invitation) => acc + invitation.guestsConfirmed!,
    0
  );

  const returnValue = useMemo(
    () => ({
      search,
      setSearch,
      isLoading,
      openForm,
      remove,
      filteredInvitations,
      totalGuestsCount,
      totalGuestsConfirmed
    }),
    [
      search,
      isLoading,
      filteredInvitations,
      totalGuestsCount,
      totalGuestsConfirmed
    ]
  );

  return (
    <InvitationsTabContext.Provider value={returnValue}>
      {children}
    </InvitationsTabContext.Provider>
  );
};

export default InvitationsTabProvider;

export const useInvitationsTabContext = () =>
  useContext(InvitationsTabContext)!;
