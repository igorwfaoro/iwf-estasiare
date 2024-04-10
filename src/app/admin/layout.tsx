'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProviderComposer from '../../components/ProviderCompose';
import ToastProvider from '../../contexts/ToastContext';
import LoaderProvider from '../../contexts/LoaderContext';
import ModalProvider from '../../contexts/ModalContext';
import AlertProvider from '../../contexts/AlertContext';
import Loading from '../loading';

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
