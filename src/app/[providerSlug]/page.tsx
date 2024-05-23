import { Metadata } from 'next';
import { cache } from 'react';
import { createProviderServerService } from '../../services/server/provider.server-service';
import { COLORS } from '../../util/colors';
import About from './components/About/About';
import Profile from './components/Profile/Profile';
import Share from './components/Share/Share';

export const revalidate = 3600;

interface ProviderPageProps {
  params: { providerSlug: string };
}

const getProvider = cache(async (providerSlug: string) => {
  return await createProviderServerService().getBySlug(providerSlug);
});

export async function generateMetadata({
  params
}: ProviderPageProps): Promise<Metadata> {
  const provider = await getProvider(params.providerSlug);

  return {
    title: `${provider.name} | Estasiare`
  };
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const provider = await getProvider(params.providerSlug);

  const bgColor = provider.primaryColor || COLORS.primary;

  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-24 z-0"
        style={{ backgroundColor: bgColor }}
      />
      <div className="max-w-[672px] mx-auto space-y-8 z-10 relative">
        <Profile provider={provider} />
        <Share provider={provider} />
        <About />
      </div>
    </>
  );
}
