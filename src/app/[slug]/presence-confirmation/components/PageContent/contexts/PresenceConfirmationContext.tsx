'use client';

import {
  RefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InvitationViewModel } from '../../../../../../models/view-models/invitation.view-model';
import { GuestViewModel } from '../../../../../../models/view-models/guest.view-model';
import { useToast } from '../../../../../../contexts/ToastContext';
import { createInvitationClientService } from '../../../../../../client-services/invitation.client-service';
import { EventBySlugViewModel } from '../../../../../../models/view-models/event-by-slug.view-model';

export interface IPresenceConfirmationProvider {
  invitation?: InvitationViewModel;
  gettingInvitation: boolean;
  getInvitation: (description: string) => void;
  guestsSelects: GuestViewModel[];
  setGuestsSelectsValue: (guestId: number, selected: boolean) => void;
  confirmGuests: () => void;
  loadingConfirmGuests: boolean;
  isAlreadyConfirmed: boolean;
  guestsListRef: RefObject<HTMLDivElement>;
  event: EventBySlugViewModel;
}

interface PresenceConfirmationProviderProps {
  children: any;
  event: EventBySlugViewModel;
}

const PresenceConfirmationContext = createContext<
  IPresenceConfirmationProvider | undefined
>(undefined);

const PresenceConfirmationProvider = (
  props: PresenceConfirmationProviderProps
) => {
  const invitationClientService = createInvitationClientService();

  const toast = useToast();

  const [invitation, setInvitation] = useState<InvitationViewModel>();
  const [gettingInvitation, setGettingInvitation] = useState(false);

  const [guestsSelects, setGuestsSelects] = useState<GuestViewModel[]>([]);

  const [loadingConfirmGuests, setLoadingConfirmGuests] = useState(false);
  const [isAlreadyConfirmed, setIsAlreadyConfirmed] = useState(false);

  const guestsListRef = useRef<HTMLDivElement>(null);

  const getInvitation = (description: string) => {
    setGettingInvitation(true);
    invitationClientService
      .getByDescription(props.event.id, description)
      .then((response) => {
        setInvitation(response);
        setGuestsSelects(
          response.guests?.map((g) => ({ ...g, selected: false })) ?? []
        );
        guestsListRef.current?.scrollIntoView();
      })
      .catch(() => {
        toast.open(
          'Convite não encontrado 😥 Verifique se o código está correto',
          'error'
        );
        setInvitation(undefined);
      })
      .finally(() => setGettingInvitation(false));
  };

  const confirmGuests = () => {
    setLoadingConfirmGuests(true);
    invitationClientService
      .updateGuestsConfirmations(
        invitation!.id,
        guestsSelects.map((g) => ({
          id: g.id,
          isConfirmed: g.isConfirmed,
        }))
      )
      .then(() => {
        setIsAlreadyConfirmed(true);
        window.scrollTo(0, 0);
      })
      .finally(() => setLoadingConfirmGuests(false));
  };

  const setGuestsSelectsValue = (guestId: number, isConfirmed: boolean) => {
    setGuestsSelects((curr) =>
      curr.map((g) => (g.id === guestId ? { ...g, isConfirmed } : g))
    );
  };

  const returnValue = useMemo(
    () => ({
      invitation,
      gettingInvitation,
      getInvitation,
      guestsSelects,
      setGuestsSelectsValue,
      confirmGuests,
      loadingConfirmGuests,
      isAlreadyConfirmed,
      guestsListRef,
      event: props.event,
    }),
    [
      invitation,
      gettingInvitation,
      guestsSelects,
      loadingConfirmGuests,
      isAlreadyConfirmed,
      guestsListRef,
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
