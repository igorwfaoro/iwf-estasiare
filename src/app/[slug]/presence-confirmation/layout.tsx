import { ReactNode } from 'react';
import './layout.scss';

interface PresenceConfirmationLayoutProps {
  children: ReactNode;
}

export default function PresenceConfirmationLayout({ children }: PresenceConfirmationLayoutProps) {
  return (
    <div id="presence-confirmation-layout">{children}</div>
  );
}
