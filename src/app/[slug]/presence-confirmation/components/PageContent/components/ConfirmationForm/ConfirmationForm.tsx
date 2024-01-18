import InvitationActions from './components/InvitationActions/InvitationActions';
import InvitationGuests from './components/InvitationGuests/InvitationGuests';
import InvitationSearch from './components/InvitationSearch/InvitationSearch';

export default function ConfirmationForm() {
  return (
    <div className="max-w-2xl w-full flex flex-col gap-8">
      <InvitationSearch />
      <InvitationGuests />
      <InvitationActions />
    </div>
  );
}
