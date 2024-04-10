import { EventDetailViewModel } from '../../../../../../../../../../models/view-models/event-detail.view-model';

interface FinancialCardProps {
  event: EventDetailViewModel;
}

export default function FinancialCard({ event }: FinancialCardProps) {
  return (
    <>
      <span>Código Paypal: </span>
      <span className="font-bold">{event.financial?.paypalBusinessCode}</span>
    </>
  );
}
