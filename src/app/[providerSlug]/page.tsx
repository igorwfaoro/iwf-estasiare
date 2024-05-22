import { Metadata } from 'next';
import { ReactNode, cache } from 'react';
import { createProviderServerService } from '../../services/server/provider.server-service';

export const revalidate = 3600;

interface PageProps {
  params: { providerSlug: string };
  children: ReactNode;
}

const getProvider = cache(async (providerSlug: string) => {
  return await createProviderServerService().getBySlug(providerSlug);
});

export async function generateMetadata({
  params
}: {
  params: { providerSlug: string };
}): Promise<Metadata> {
  const provider = await getProvider(params.providerSlug);

  return {
    title: `${provider.name} | Estasiare`
  };
}

export default async function ProviderPage({ params }: PageProps) {
  const provider = await getProvider(params.providerSlug);

  return (
    <div className="bg-red-500">
      <pre>{JSON.stringify(provider, null, 2)}</pre>
    </div>
  );
}
