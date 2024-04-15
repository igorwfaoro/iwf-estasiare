'use client';

import {
  RefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react';
import { InvitationViewModel } from '../../../../../../models/view-models/invitation.view-model';
import { GuestViewModel } from '../../../../../../models/view-models/guest.view-model';
import { useToast } from '../../../../../../contexts/ToastContext';
import { EventDetailViewModel } from '../../../../../../models/view-models/event-detail.view-model';
import { createInvitationClientService } from '../../../../../../services/client/invitation.client-service';
import { GuestStatus } from '@prisma/client';
import { InvitationDetailViewModel } from '../../../../../../models/view-models/invitation-detail.view-model';

export interface IPresenceConfirmationProvider {
  invitation?: InvitationViewModel;
  gettingInvitations: boolean;
  searchInvitations: (description: string) => void;
  guestsSelects: GuestViewModel[];
  setGuestsSelectsValue: (guestId: number, selected: boolean) => void;
  confirmGuests: () => void;
  selectInvitation: (invitation: InvitationDetailViewModel) => void;
  loadingConfirmGuests: boolean;
  isAlreadyConfirmed: boolean;
  guestsListRef: RefObject<HTMLDivElement>;
  event: EventDetailViewModel;
  invitations: InvitationDetailViewModel[];
}

interface PresenceConfirmationProviderProps {
  children: any;
  event: EventDetailViewModel;
}

const PresenceConfirmationContext = createContext<
  IPresenceConfirmationProvider | undefined
>(undefined);

const PresenceConfirmationProvider = (
  props: PresenceConfirmationProviderProps
) => {
  const invitationClientService = createInvitationClientService();

  const toast = useToast();

  const [invitations, setInvitations] = useState<InvitationDetailViewModel[]>([]);

  const [selectedInvitation, setSelectedInvitation] =
    useState<InvitationViewModel>();
  const [gettingInvitations, setGettingInvitations] = useState(false);

  const [guestsSelects, setGuestsSelects] = useState<GuestViewModel[]>([]);

  const [loadingConfirmGuests, setLoadingConfirmGuests] = useState(false);
  const [isAlreadyConfirmed, setIsAlreadyConfirmed] = useState(false);

  const guestsListRef = useRef<HTMLDivElement>(null);

  const searchInvitations = (query: string) => {
    setGettingInvitations(true);
    invitationClientService
      .searchByGuestName(props.event.id, query)
      .then((response) => {
        setInvitations(response);
      })
      .catch(() => {
        toast.open(
          'Nenhum convite encontrado 😥 Verifique se a busca está correta',
          'error'
        );
        setSelectedInvitation(undefined);
      })
      .finally(() => setGettingInvitations(false));
  };

  const selectInvitation = (invitation: InvitationDetailViewModel) => {
    setSelectedInvitation(invitation);
    setGuestsSelects(
      invitation.guests.map((g) => ({ ...g, selected: false })) ?? []
    );
    guestsListRef.current?.scrollIntoView();
  };

  const confirmGuests = () => {
    setLoadingConfirmGuests(true);
    invitationClientService
      .updateGuestsConfirmations(
        props.event.id,
        selectedInvitation!.id,
        guestsSelects.map((g) => ({
          id: g.id,
          status: g.status
        }))
      )
      .then(() => {
        setIsAlreadyConfirmed(true);
        window.scrollTo(0, 0);
      })
      .finally(() => setLoadingConfirmGuests(false));
  };

  const setGuestsSelectsValue = (guestId: number, selected: boolean) => {
    setGuestsSelects((curr) =>
      curr.map((g) =>
        g.id === guestId
          ? {
              ...g,
              status: (selected ? 'CONFIRMED' : 'DECLINED') as GuestStatus
            }
          : g
      )
    );
  };

  const returnValue = useMemo(
    () => ({
      selectedInvitation,
      gettingInvitations,
      searchInvitations,
      guestsSelects,
      setGuestsSelectsValue,
      confirmGuests,
      selectInvitation,
      loadingConfirmGuests,
      isAlreadyConfirmed,
      guestsListRef,
      event: props.event,
      invitations
    }),
    [
      selectedInvitation,
      gettingInvitations,
      guestsSelects,
      loadingConfirmGuests,
      isAlreadyConfirmed,
      guestsListRef,
      invitations
    ]
  );

  return (
    <PresenceConfirmationContext.Provider value={returnValue}>
      {props.children}
    </PresenceConfirmationContext.Provider>
  );
};

export default PresenceConfirmationProvider;

export const usePresenceConfirmationContext = () =>
  useContext(PresenceConfirmationContext)!;
