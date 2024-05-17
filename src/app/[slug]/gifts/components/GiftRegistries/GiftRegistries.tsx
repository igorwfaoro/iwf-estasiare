import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';

interface GiftRegistriesProps {
  event: EventDetailViewModel;
}

export default function GiftRegistries({ event }: GiftRegistriesProps) {
  if (!event.giftRegistries?.length) return <></>;

  console.log(event.giftRegistries);

  return (
    <div>
      <p>
        Fique a vontade se quiser acessar alguma lista de presentes externa:
      </p>
    </div>
  );
}
