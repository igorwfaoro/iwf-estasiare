'use client';

import ConfirmationForm from './components/ConfirmationForm/ConfirmationForm';
import Header from './components/Header/Header';
import InvitationSuccess from './components/InvitationSuccess/InvitationSuccess';
import { usePresenceConfirmationContext } from './contexts/PresenceConfirmationContext';

export default function PresenceConfirmationContent() {
  const { isAlreadyConfirmed } = usePresenceConfirmationContext();

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
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
