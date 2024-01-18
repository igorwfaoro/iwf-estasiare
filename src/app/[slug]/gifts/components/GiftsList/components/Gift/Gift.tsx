'use client';

import Button from '../../../../../../../components/Button/Button';
import Card from '../../../../../../../components/Card/Card';
import { useModal } from '../../../../../../../contexts/ModalContext';
import { EventDetailViewModel } from '../../../../../../../models/view-models/event-detail.view-model';
import { GiftViewModel } from '../../../../../../../models/view-models/gift.view-model';
import { toCurrency } from '../../../../../../../util/helpers/number.helper';
import GiftPaymentModal, {
  GiftPaymentModalProps
} from './components/GiftPaymentModal/GiftPaymentModal';

interface GiftProps {
  event: EventDetailViewModel;
  gift: GiftViewModel;
}

export default function Gift({ event, gift }: GiftProps) {
  const modal = useModal();

  const openPaymentModal = () => {
    modal.open({
      component: GiftPaymentModal,
      title: 'Presentear',
      props: { event, gift } as GiftPaymentModalProps,
      width: window.innerWidth < 768 ? '90%' : '30%'
    });
  };

  return (
    <Card className="bg-white overflow-hidden">
      <img
        className="h-96 w-full object-cover"
        src={gift.image}
        alt={gift.description}
      />
      <div className="p-4 flex flex-col justify-between gap-2 h-44">
        <h2 className="text-2xl font-semibold text-gray-800 overflow-hidden line-clamp-2">
          {gift.description}
        </h2>
        <div
          className="text-xl font-semibold"
          style={{ color: event.content?.primaryColor }}
        >
          {toCurrency(gift.price)}
        </div>

        <Button
          className="py-2"
          onClick={openPaymentModal}
          theme="primary"
          color={event.content?.primaryColor}
        >
          Presentear
        </Button>
      </div>
    </Card>
  );
}
