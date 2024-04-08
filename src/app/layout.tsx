import '../styles/globals.scss';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { locale } from '../util/locale';
import { GoogleAnalytics } from '@next/third-parties/google';

dayjs.locale(locale.id);

const { NEXT_PUBLIC_GTAG: GTAG } = process.env;

export const metadata: Metadata = {
  title: 'Estasiare'
};

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
