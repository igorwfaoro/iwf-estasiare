'use client';

import { useEffect } from 'react';
import { createProviderClientService } from '../../services/client/provider.client-service';

interface ProvidersPageProps {}

export default function ProvidersPage({}: ProvidersPageProps) {
  const providerService = createProviderClientService();

  useEffect(() => {
    providerService.search().then(console.log);
  }, []);

  return <div>Providers</div>;
}
