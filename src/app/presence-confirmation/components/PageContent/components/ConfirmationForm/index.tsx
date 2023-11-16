import InvitationActions from './components/InvitationActions';
import InvitationGuests from './components/InvitationGuests';
import InvitationSearch from './components/InvitationSearch';
import InvitationSuccess from '../InvitationSuccess';
import './index.scss';

export default function ConfirmationForm() {
  return (
    <div id="confirmation-form">
      <InvitationSearch />
      <InvitationGuests />
      <InvitationActions />
    </div>
  );
}
