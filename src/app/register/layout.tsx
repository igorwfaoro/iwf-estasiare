'use client';

import { SessionProvider } from 'next-auth/react';
import LoaderProvider from '../../contexts/LoaderContext';
import ToastProvider from '../../contexts/ToastContext';

interface RegisterLayoutProps {
  children: JSX.Element;
}

export default function RegisterLayout({
  children
}: RegisterLayoutProps) {
  return (
    <SessionProvider>
      <ToastProvider>
        <LoaderProvider>{children}</LoaderProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
