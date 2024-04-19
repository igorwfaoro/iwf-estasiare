import { MdDelete, MdEdit } from 'react-icons/md';

import Card from '../../../../../../../../../../components/Card/Card';
import { GiftViewModel } from '../../../../../../../../../../models/view-models/gift.view-model';
import { toCurrency } from '../../../../../../../../../../util/helpers/number.helper';

interface GiftItemProps {
  gift: GiftViewModel;
  handleEdit: (gift: GiftViewModel) => void;
  handleDelete: (gift: GiftViewModel) => void;
}

export default function GiftItem({
  gift,
  handleEdit,
  handleDelete
}: GiftItemProps) {
  return (
    <Card key={gift.id} className="flex gap-2">
      <div
        className="h-20 w-28 bg-center bg-cover rounded-xl m-3"
        style={{ backgroundImage: `url(${gift.image})` }}
      />

      <div className="flex justify-between w-full p-2">
        <div>
          <h1 className="font-bold">{gift.description}</h1>
          <div>{toCurrency(gift.price)}</div>
        </div>

        <div className="flex gap-1 text-xl ml-3 items-start">
          <button onClick={() => handleEdit(gift)}>
            <MdEdit />
          </button>
          <button onClick={() => handleDelete(gift)}>
            <MdDelete />
          </button>
        </div>
      </div>
    </Card>
  );
}
