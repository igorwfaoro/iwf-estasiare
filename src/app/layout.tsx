import '../styles/globals.scss';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { locale } from '../util/locale';
import { GoogleAnalytics } from '@next/third-parties/google';
import { COLORS } from '../util/colors';

const meta = {
  title: 'Estasiare | Construindo momentos mágicos!',
  description:
    'Acreditamos que cada momento especial merece ser celebrado de forma única e inesquecível. Com nossa plataforma intuitiva e flexível, você pode criar o evento dos seus sonhos, seja um casamento mágico, um aniversário emocionante ou qualquer ocasião especial que mereça ser comemorada.',
  image: '/images/logo-profile.png'
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  robots: 'index',
  themeColor: COLORS.primary,
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    type: 'website',
    siteName: `Estasiare`
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    card: 'summary',
    images: meta.image
  }
};

dayjs.locale(locale.id);

const { NEXT_PUBLIC_GTAG: GTAG } = process.env;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={locale.id}>
      <body>
        <>{children}</>
        <GoogleAnalytics gaId={GTAG} />
      </body>
    </html>
  );
}
