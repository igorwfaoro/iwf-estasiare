'use client';

import LoaderProvider from '../../contexts/LoaderContext';
import ToastProvider from '../../contexts/ToastContext';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Content from './components/Content/Content';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import ProviderSearchProvider from './contexts/ProviderSearchContext';

interface ProvidersPageProps {}

export default function ProvidersPage({}: ProvidersPageProps) {
  return (
    <main className="bg-gray-100">
      <Navbar />
      <Header />

      <LoaderProvider>
        <ToastProvider>
          <ProviderSearchProvider>
            <div className="space-y-4 pt-4 pb-10 px-3">
              <Filter />
              <Content />
            </div>
          </ProviderSearchProvider>
        </ToastProvider>
      </LoaderProvider>

      <Footer />
    </main>
  );
}
