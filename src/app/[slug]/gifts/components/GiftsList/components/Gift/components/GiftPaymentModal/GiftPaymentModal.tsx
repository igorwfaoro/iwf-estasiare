import Button from '../../../../../../../../../components/Button/Button';
import { EventDetailViewModel } from '../../../../../../../../../models/view-models/event-detail.view-model';
import { GiftViewModel } from '../../../../../../../../../models/view-models/gift.view-model';
import { toCurrency } from '../../../../../../../../../util/helpers/number.helper';
import { locale } from '../../../../../../../../../util/locale';

export interface GiftPaymentModalProps {
  event: EventDetailViewModel;
  gift: GiftViewModel;
}

export default function GiftPaymentModal({
  event,
  gift
}: GiftPaymentModalProps) {
  const paymentLink = `https://www.paypal.com/donate?business=${event.financial?.paypalBusinessCode}&no_recurring=0&item_name=${gift.description}&amount=${gift.price}&currency_code=${locale.currency}`;

  return (
    <div className="text-center p-6 flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <img
          src={gift.image}
          alt={`image ${gift.description}`}
          className="max-h-52 md:max-h-96"
        />
      </div>

      <h1 className="text-xl font-bold">{gift.description}</h1>
      <h3
        className="text-lg font-bold"
        style={{ color: event.content?.primaryColor }}
      >
        {toCurrency(gift.price)}
      </h3>
      <p>
        Você pode doar o valor do presente simbólico que escolheu e nós
        receberemos 😉
      </p>
      <Button
        href={paymentLink}
        target="_blank"
        theme="primary"
        color={event.content?.primaryColor}
      >
        Dê seu presente
      </Button>
    </div>
  );
}
