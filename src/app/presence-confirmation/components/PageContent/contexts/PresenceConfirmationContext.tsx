import {
  RefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InvitationViewModel } from '../../../../../models/view-models/invitation.view-model';
import { GuestViewModel } from '../../../../../models/view-models/guest.view-model';
import { createInvitationFetcher } from '../../../../../client-services/invitation.fetcher';
import { useToast } from '../../../../../contexts/ToastContext';

export interface IPresenceConfirmationProvider {
  invitation?: InvitationViewModel;
  gettingInvitation: boolean;
  getInvitationByCode: (code: string) => void;
  guestsSelects: GuestViewModel[];
  setGuestsSelectsValue: (guestId: number, selected: boolean) => void;
  confirmGuests: () => void;
  loadingConfirmGuests: boolean;
  isAlreadyConfirmed: boolean;
  guestsListRef: RefObject<HTMLDivElement>;
}

interface PresenceConfirmationProviderProps {
  children: any;
}

const PresenceConfirmationContext = createContext<
  IPresenceConfirmationProvider | undefined
>(undefined);

const PresenceConfirmationProvider = (
  props: PresenceConfirmationProviderProps
) => {
  const invitationFetcher = createInvitationFetcher();

  const toast = useToast();

  const [invitation, setInvitation] = useState<InvitationViewModel>();
  const [gettingInvitation, setGettingInvitation] = useState(false);

  const [guestsSelects, setGuestsSelects] = useState<GuestViewModel[]>([]);

  const [loadingConfirmGuests, setLoadingConfirmGuests] = useState(false);
  const [isAlreadyConfirmed, setIsAlreadyConfirmed] = useState(false);

  const guestsListRef = useRef<HTMLDivElement>(null);

  const getInvitationByCode = (code: string) => {
    setGettingInvitation(true);
    invitationFetcher
      .getByCode(code)
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
    invitationFetcher
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
      getInvitationByCode,
      guestsSelects,
      setGuestsSelectsValue,
      confirmGuests,
      loadingConfirmGuests,
      isAlreadyConfirmed,
      guestsListRef,
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

export const withContext = (Component: any) => (props: any) =>
  (
    <PresenceConfirmationProvider>
      <Component {...props} />
    </PresenceConfirmationProvider>
  );
