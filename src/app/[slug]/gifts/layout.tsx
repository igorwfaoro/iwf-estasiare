import { ReactNode } from 'react';
import ModalProvider from '../../contexts/ModalContext';
import './layout.scss';

interface GiftsLayoutProps {
  children: ReactNode;
}

export default function GiftsLayout({ children }: GiftsLayoutProps) {
  return (
    <ModalProvider>
      <div id="gifts-layout">{children}</div>
    </ModalProvider>
  );
}
