import Button from '../../../../../../../../components/Button';
import { GiftViewModel } from '../../../../../../../../models/view-models/gift.view-model';
import { toCurrency } from '../../../../../../../../util/helpers/number.helper';
import { locale } from '../../../../../../../../util/locale';
import './index.scss';

export interface GiftPaymentModalProps {
  gift: GiftViewModel;
}

export default function GiftPaymentModal({ gift }: GiftPaymentModalProps) {
  const paymentLink = `https://www.paypal.com/donate?business=igor.faoro17@gmail.com&no_recurring=0&item_name=${gift.description}&amount=${gift.price}&currency_code=${locale.currency}`;

  return (
    // <div id="donate-button"></div>
    // <Modal isOpen={isOpen}>
    //   <div id="paypal-button-container"></div>
    // </Modal>
    <div id="gift-payment-modal">
      <h1 className="description">{gift.description}</h1>
      <h3 className="price">{toCurrency(gift.price)}</h3>
      <p className="text">
        Você pode doar o valor do presente simbólico que escolheu e nóe
        receberemos 😉
      </p>
      <Button link={paymentLink} linkTarget="_blank" theme="primary">
        Dê seu presente
      </Button>
    </div>
  );
}
