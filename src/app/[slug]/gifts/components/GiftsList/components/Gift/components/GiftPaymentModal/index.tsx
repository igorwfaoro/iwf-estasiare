import Button from '../../../../../../../../../components/Button';
import { EventViewModel } from '../../../../../../../../../models/view-models/event.view-model';
import { GiftViewModel } from '../../../../../../../../../models/view-models/gift.view-model';
import { toCurrency } from '../../../../../../../../../util/helpers/number.helper';
import { locale } from '../../../../../../../../../util/locale';
import './index.scss';

export interface GiftPaymentModalProps {
  event: EventViewModel;
  gift: GiftViewModel;
}

export default function GiftPaymentModal({
  event,
  gift,
}: GiftPaymentModalProps) {
  const paymentLink = `https://www.paypal.com/donate?business=igor.faoro17@gmail.com&no_recurring=0&item_name=${gift.description}&amount=${gift.price}&currency_code=${locale.currency}`;

  return (
    <div id="gift-payment-modal">
      <h1 className="description">{gift.description}</h1>
      <h3 className="price" style={{ color: event.content.primaryColor }}>
        {toCurrency(gift.price)}
      </h3>
      <p className="text">
        Você pode doar o valor do presente simbólico que escolheu e nós
        receberemos 😉
      </p>
      <Button
        link={paymentLink}
        linkTarget="_blank"
        theme="primary"
        color={event.content.primaryColor}
      >
        Dê seu presente
      </Button>
    </div>
  );
}
