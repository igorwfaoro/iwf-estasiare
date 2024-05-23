import { Metadata } from 'next';
import { ReactNode, Suspense, cache } from 'react';
import { createProviderServerService } from '../../services/server/provider.server-service';
import { COLORS } from '../../util/colors';
import Footer from '../components/Footer/Footer';
import Loading from '../loading';
import Navbar from './components/Navbar/Navbar';

export const revalidate = 3600;

interface LayoutProps {
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
    description: provider.name,
    robots: 'index',
    themeColor: COLORS.primary,
    openGraph: {
      description: provider.name,
      images: provider.profileImage || undefined,
      type: 'website',
      siteName: `Estasiare`
    },
    twitter: {
      title: provider.name,
      description: `${provider.name}`,
      card: 'summary',
      images: provider.profileImage || undefined
    }
  };
}

export default async function ProviderLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className="p-5 pt-12 bg-gray-100 min-h-[calc(100vh-3rem)]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <Footer />
    </>
  );
}
