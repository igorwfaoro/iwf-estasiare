'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, Suspense, useEffect } from 'react';

import ProviderComposer from '../../components/ProviderCompose';
import AlertProvider from '../../contexts/AlertContext';
import LoaderProvider from '../../contexts/LoaderContext';
import ModalProvider from '../../contexts/ModalContext';
import ToastProvider from '../../contexts/ToastContext';
import Loading from '../loading';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  useEffect(() => {
    document.title = 'Admin | Estasiare';
  }, []);

  return (
    <ProviderComposer
      components={[
        { Component: ToastProvider },
        { Component: LoaderProvider },
        { Component: SessionProvider },
        { Component: ModalProvider },
        { Component: AlertProvider }
      ]}
    >
      <Navbar />
      <div className="p-5 pt-12 bg-gray-100 min-h-[calc(100vh-3rem)]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <Footer />
    </ProviderComposer>
  );
}
