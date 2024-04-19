import { EventDetailViewModel } from '../../../../../../../../../../models/view-models/event-detail.view-model';

interface ContactInfoCardProps {
  event: EventDetailViewModel;
}

export default function ContactInfoCard({ event }: ContactInfoCardProps) {
  const { description, phoneNumber, whatsAppNumber, email } =
    event.contactInfo || {};

  const isEmpty = !description && !phoneNumber && !whatsAppNumber && !email;

  if (isEmpty) return <div>Não configurado</div>;

  return (
    <>
      {description && (
        <div>
          <span>Descrição: </span>
          <span className="font-bold">{description}</span>
        </div>
      )}

      {phoneNumber && (
        <div>
          <span>Telefone: </span>
          <span className="font-bold">{phoneNumber}</span>
        </div>
      )}

      {whatsAppNumber && (
        <div>
          <span>WhatsApp: </span>
          <span className="font-bold">{whatsAppNumber}</span>
        </div>
      )}

      {email && (
        <div>
          <span>E-mail: </span>
          <span className="font-bold">{email}</span>
        </div>
      )}
    </>
  );
}
