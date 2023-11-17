import { cache } from 'react';
import { createInfoService } from '../../app-services/info.service';
import { Metadata } from 'next';
import PresenceConfirmationContent from './components/PageContent';

export const revalidate = 3600;

const getInfo = cache(async () => {
  return await createInfoService().getInfo();
});

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const info = await getInfo();

  return {
    title: `Confirmação de presença | ${info.groomName} & ${info.brideName} | Wedding`,
  };
}

export default async function PresenceConfirmation() {
  return (
    <PresenceConfirmationContent />
  );
}
