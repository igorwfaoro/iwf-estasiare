'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProviderComposer from '../../components/ProviderCompose';
import ToastProvider from '../../contexts/ToastContext';
import LoaderProvider from '../../contexts/LoaderContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProviderComposer
      components={[
        { Component: ToastProvider },
        { Component: LoaderProvider },
        { Component: SessionProvider }
      ]}
    >
      <Navbar />
      <div className="p-5 pt-12 bg-gray-100 min-h-[calc(100vh-3rem)]">
        {children}
      </div>
      <Footer />
    </ProviderComposer>
  );
}
