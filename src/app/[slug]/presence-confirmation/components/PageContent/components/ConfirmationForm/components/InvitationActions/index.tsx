import Button from '../../../../../../../../../components/Button';
import { usePresenceConfirmationContext } from '../../../../contexts/PresenceConfirmationContext';
import './index.scss';

export default function InvitationActions() {
  const {
    guestsSelects,
    confirmGuests,
    loadingConfirmGuests,
    isAlreadyConfirmed,
    event,
  } = usePresenceConfirmationContext();

  const disableConfirmButton =
    !guestsSelects.some((g) => g.isConfirmed) || loadingConfirmGuests;

  const buttonText = loadingConfirmGuests
    ? 'Confirmando...'
    : 'Confirmar convidados';

  if (isAlreadyConfirmed) return <></>;

  return (
    <div id="invitation-actions">
      {!!guestsSelects.length && (
        <Button
          className="button-confirm"
          theme="primary"
          disabled={disableConfirmButton}
          onClick={confirmGuests}
          color={event.content?.primaryColor}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
