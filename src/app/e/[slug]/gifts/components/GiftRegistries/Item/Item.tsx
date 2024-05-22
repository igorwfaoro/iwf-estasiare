import Button from '../../../../../../../components/Button/Button';
import Card from '../../../../../../../components/Card/Card';
import { GiftRegistryViewModel } from '../../../../../../../models/view-models/gift-registry.view-model';

interface ItemProps {
  giftRegistry: GiftRegistryViewModel;
}

export default function Item({ giftRegistry }: ItemProps) {
  return (
    <Card
      key={`giftRegistry-${giftRegistry.id}`}
      className="flex justify-between gap-4 p-3 items-center"
    >
      <div>
        <h4 className="font-bold">{giftRegistry.storeName}</h4>
        {giftRegistry.description && (
          <span className="text-gray-600 text-sm">{giftRegistry.description}</span>
        )}
      </div>

      {giftRegistry.url && (
        <Button
          href={giftRegistry.url}
          target="_blank"
          size="small"
          theme="primary-outline"
        >
          Acessar
        </Button>
      )}
    </Card>
  );
}
