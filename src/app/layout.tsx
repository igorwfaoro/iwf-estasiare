import dayjs from 'dayjs';
import { MainLayout } from '../components/MainLayout';
import { ReactNode } from 'react';
import '../styles/globals.scss';
import { Metadata } from 'next';
import { locale } from '../util/locale';

dayjs.locale(locale.id);

export const metadata: Metadata = {
  title: 'Wedding',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={locale.id}>
      <body>
        <MainLayout>{children}</MainLayout>

        {/* <script src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"></script> */}
        <script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"></script>
      </body>
    </html>
  );
}
