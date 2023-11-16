import { createGiftService } from '../../app-services/gift.service';
import { createInfoService } from '../../app-services/info.service';
import { cache } from 'react';
import { Metadata } from 'next';
import Header from './components/Header';
import GiftsList from './components/GiftsList';

export const revalidate = 3600;

const giftService = createGiftService();

const getInfo = cache(async () => {
  return await createInfoService().getInfo();
});

const getGifts = cache(async () => {
  return await giftService.getAll();
});

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const info = await getInfo();

  return {
    title: `Presentes | ${info.groomName} & ${info.brideName} | Wedding`,
  };
}

export default async function Gifts() {
  const gifts = await getGifts();

  return (
    <div>
      <Header />
      <GiftsList gifts={gifts} />
    </div>
  );
}
