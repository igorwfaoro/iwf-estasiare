import Checkbox from '../../../../../../../../../../components/Checkbox/Checkbox';
import { usePresenceConfirmationContext } from '../../../../contexts/PresenceConfirmationContext';

export default function InvitationGuests() {
  const {
    guestsSelects,
    setGuestsSelectsValue,
    isAlreadyConfirmed,
    guestsListRef,
    event
  } = usePresenceConfirmationContext();

  if (isAlreadyConfirmed) return <></>;

  return (
    <div ref={guestsListRef} className="w-full flex flex-col gap-3">
      {guestsSelects?.map((g) => (
        <Checkbox
          key={g.id}
          label={g.name}
          onChange={(e) => setGuestsSelectsValue(g.id, e.target.checked)}
          checked={g.status === 'CONFIRMED'}
          color={event.content?.primaryColor}
        />
      ))}
    </div>
  );
}
