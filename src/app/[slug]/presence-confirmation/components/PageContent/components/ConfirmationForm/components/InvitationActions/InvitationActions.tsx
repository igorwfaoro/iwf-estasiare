import Button from '../../../../../../../../../components/Button/Button';
import { usePresenceConfirmationContext } from '../../../../contexts/PresenceConfirmationContext';

export default function InvitationActions() {
  const {
    guestsSelects,
    confirmGuests,
    loadingConfirmGuests,
    isAlreadyConfirmed,
    event
  } = usePresenceConfirmationContext();

  const buttonText = loadingConfirmGuests
    ? 'Confirmando...'
    : 'Confirmar convidados';

  if (isAlreadyConfirmed) return <></>;

  return (
    <>
      {!!guestsSelects.length && (
        <Button
          className="w-full"
          onClick={confirmGuests}
          color={event.content?.primaryColor}
        >
          {buttonText}
        </Button>
      )}
    </>
  );
}
