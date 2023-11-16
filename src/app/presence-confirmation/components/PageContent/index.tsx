'use client';

import ToastProvider from '../../../../contexts/ToastContext';
import ConfirmationForm from './components/ConfirmationForm';
import Header from './components/Header';
import InvitationSuccess from './components/InvitationSuccess';
import {
  usePresenceConfirmationContext,
  withContext,
} from './contexts/PresenceConfirmationContext';
import './index.scss';

function PresenceConfirmationContent() {
  const { isAlreadyConfirmed } = usePresenceConfirmationContext();

  return (
    <div id="presence-confirmation-page-content">
      {!isAlreadyConfirmed ? (
        <>
          <Header />
          <ToastProvider>
            <ConfirmationForm />
          </ToastProvider>
        </>
      ) : (
        <InvitationSuccess />
      )}
    </div>
  );
}

export default withContext(PresenceConfirmationContent);
