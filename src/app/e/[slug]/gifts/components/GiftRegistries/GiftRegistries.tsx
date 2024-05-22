import { EventDetailViewModel } from '../../../../../../models/view-models/event-detail.view-model';
import Item from './Item/Item';

interface GiftRegistriesProps {
  event: EventDetailViewModel;
}

export default function GiftRegistries({ event }: GiftRegistriesProps) {
  if (!event.giftRegistries?.length) return <></>;

  const giftRegistriesListContent =
    event.giftRegistries.length > 1 ? (
      <span>
        nossas <strong>listas de presentes</strong> externas
      </span>
    ) : (
      <span>
        nossa <strong>lista de presente</strong> externa
      </span>
    );

  return (
    <div className="max-w-[672px] mx-auto space-y-2">
      <p className="text-lg text-center text-gray-800">
        Se preferir, você pode acessar {giftRegistriesListContent}:
      </p>

      <div className="space-y-2">
        {event.giftRegistries.map((it) => (
          <Item giftRegistry={it} />
        ))}
      </div>
    </div>
  );
}
