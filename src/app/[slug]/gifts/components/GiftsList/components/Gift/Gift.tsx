'use client';

import Button from '../../../../../../../components/Button/Button';
import Card from '../../../../../../../components/Card/Card';
import { EventDetailViewModel } from '../../../../../../../models/view-models/event-detail.view-model';
import { GiftViewModel } from '../../../../../../../models/view-models/gift.view-model';
import { toCurrency } from '../../../../../../../util/helpers/number.helper';

interface GiftProps {
  event: EventDetailViewModel;
  gift: GiftViewModel;
  onClickOpen: (gift: GiftViewModel) => void;
}

export default function Gift({ event, gift, onClickOpen }: GiftProps) {
  return (
    <Card className="bg-white overflow-hidden relative">
      <img
        className="h-52 md:h-96 w-full object-cover"
        src={gift.image}
        alt={gift.description}
      />

      <div className="p-4 space-y-2 mb-11">
        <h2 className="text-md font-bold text-gray-800 overflow-hidden">
          {gift.description}
        </h2>
        <div
          className="text-xl font-semibold"
          style={{ color: event.content?.primaryColor }}
        >
          {toCurrency(gift.price)}
        </div>
      </div>

      <Button
        className="absolute w-full bottom-0 rounded-none"
        onClick={() => onClickOpen(gift)}
        theme="primary"
        color={event.content?.primaryColor}
      >
        Presentear
      </Button>
    </Card>
  );
}
