import Checkbox from '../../../../../../../../../components/Checkbox';
import { usePresenceConfirmationContext } from '../../../../contexts/PresenceConfirmationContext';
import './index.scss';

export default function InvitationGuests() {
  const {
    guestsSelects,
    setGuestsSelectsValue,
    isAlreadyConfirmed,
    guestsListRef,
    event,
  } = usePresenceConfirmationContext();

  if (isAlreadyConfirmed) return <></>;

  return (
    <div id="invitation-guests" ref={guestsListRef}>
      {guestsSelects?.map((g) => (
        <Checkbox
          key={g.id}
          label={g.name}
          onChange={(e) => setGuestsSelectsValue(g.id, e.target.checked)}
          checked={g.isConfirmed}
          color={event.content.primaryColor}
        />
      ))}
    </div>
  );
}
