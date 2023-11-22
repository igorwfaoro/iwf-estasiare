'use client';

import Button from '../../../../../../../components/Button';
import Card from '../../../../../../../components/Card';
import { useModal } from '../../../../../../../contexts/ModalContext';
import { EventViewModel } from '../../../../../../../models/view-models/event.view-model';
import { GiftViewModel } from '../../../../../../../models/view-models/gift.view-model';
import { toCurrency } from '../../../../../../../util/helpers/number.helper';
import GiftPaymentModal, {
  GiftPaymentModalProps,
} from './components/GiftPaymentModal';
import './index.scss';

interface GiftProps {
  event: EventViewModel;
  gift: GiftViewModel;
}

export default function Gift({ event, gift }: GiftProps) {
  const modal = useModal();

  const openPaymentModal = () => {
    modal.open({
      component: GiftPaymentModal,
      title: 'Presentear',
      props: { event, gift } as GiftPaymentModalProps,
      width: window.innerWidth < 768 ? '90%' : '30%',
    });
  };

  return (
    <Card className="card">
      <img className="card__image" src={gift.image} alt={gift.description} />
      <div className="card__content">
        <div>
          <h2 className="card__title">{gift.description}</h2>
          <div
            className="card__price"
            style={{ color: event.content?.primaryColor }}
          >
            {toCurrency(gift.price)}
          </div>
        </div>
        <Button
          className="card__button"
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
