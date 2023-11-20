'use client';

import './index.scss';
import ConfirmationForm from './components/ConfirmationForm';
import Header from './components/Header';
import InvitationSuccess from './components/InvitationSuccess';
import { usePresenceConfirmationContext } from './contexts/PresenceConfirmationContext';
import './index.scss';

export default function PresenceConfirmationContent() {
  const { isAlreadyConfirmed } = usePresenceConfirmationContext();

  return (
    <div id="presence-confirmation-page-content">
      {!isAlreadyConfirmed ? (
        <>
          <Header />
          <ConfirmationForm />
        </>
      ) : (
        <InvitationSuccess />
      )}
    </div>
  );
}
