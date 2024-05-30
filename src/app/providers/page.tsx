'use client';

import Content from './components/Content/Content';
import Filter from './components/Filter/Filter';
import ProviderSearchProvider from './contexts/ProviderSearchContext';

interface ProvidersPageProps {}

export default function ProvidersPage({}: ProvidersPageProps) {
  return (
    <div className="space-y-4">
      <ProviderSearchProvider>
        <Filter />
        <Content />
      </ProviderSearchProvider>
    </div>
  );
}
