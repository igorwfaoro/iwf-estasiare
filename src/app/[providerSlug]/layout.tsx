import { Metadata } from 'next';
import { ReactNode, Suspense, cache } from 'react';
import { createProviderServerService } from '../../services/server/provider.server-service';
import { COLORS } from '../../util/colors';
import Footer from '../components/Footer/Footer';
import Loading from '../loading';

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
    title: provider.name,
    description: provider.bio,
    robots: 'index',
    themeColor: COLORS.primary,
    openGraph: {
      title: provider.name,
      description: provider.bio || undefined,
      images: provider.profileImage || undefined,
      type: 'website',
      siteName: `Estasiare`
    },
    twitter: {
      title: provider.name,
      description: provider.bio || undefined,
      card: 'summary',
      images: provider.profileImage || undefined
    }
  };
}

export default async function ProviderLayout({ children }: LayoutProps) {
  return (
    <>
      <div className="p-5 bg-gray-100 min-h-[calc(100vh-3rem)]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <Footer />
    </>
  );
}
