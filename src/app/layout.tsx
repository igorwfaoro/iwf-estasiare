import '../styles/globals.scss';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { locale } from '../util/locale';

dayjs.locale(locale.id);

export const metadata: Metadata = {
  title: 'Eventy',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={locale.id}>
      <body>
        <>{children}</>
        {/* <script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"></script> */}
      </body>
    </html>
  );
}
