'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useModal } from '../../../../../contexts/ModalContext';
import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';
import { GiftViewModel } from '../../../../../models/view-models/gift.view-model';
import Gift from './components/Gift/Gift';
import GiftPaymentModal, {
  GiftPaymentModalProps
} from './components/Gift/components/GiftPaymentModal/GiftPaymentModal';

const GIFT_QUERY_KEY = 'giftId';

type GiftListItem = GiftViewModel & { loading?: boolean };

interface GiftsListProps {
  event: EventDetailViewModel;
}

export default function GiftsList({ event }: GiftsListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modal = useModal();

  const gifts: GiftListItem[] = event.gifts || [];

  useEffect(() => {
    const giftId = searchParams.get(GIFT_QUERY_KEY);
    if (giftId) {
      const gift = event.gifts?.find((g) => g.id === Number(giftId));
      if (gift) {
        openPaymentModal(gift);
      }
    }
  }, [searchParams]);

  const openPaymentModal = (gift: GiftViewModel) => {
    modal.open({
      component: GiftPaymentModal,
      title: 'Presentear',
      props: { event, gift } as GiftPaymentModalProps,
      width: window.innerWidth < 768 ? '90%' : '30%',
      onClose() {
        removeQueryParam(GIFT_QUERY_KEY);
      }
    });
  };

  const setQueryParam = (key: string, value: any) => {
    const params = new URLSearchParams(searchParams as any);
    params.set(key, String(value));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const removeQueryParam = (key: string) => {
    const params = new URLSearchParams(searchParams as any);
    params.delete(key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClickOpen = (gift: GiftViewModel) => {
    setQueryParam(GIFT_QUERY_KEY, gift.id);
  };

  return (
    <div>
      <p className="max-w-[672px] mx-auto text-lg text-center text-gray-800">
        Ou, você pode optar por escolher um <strong>presente simbólico</strong>.
        Dessa forma, ao contribuir com o valor do presente, você nos ajuda a
        construir um futuro repleto de amor e cumplicidade.
      </p>

      <div className="mt-4 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gifts.map((g, i) => (
          <Gift key={i} event={event} gift={g} onClickOpen={handleClickOpen} />
        ))}
      </div>
    </div>
  );
}
