import Chip from '../../../../../../components/Chip/Chip';
import { ProviderViewModel } from '../../../../../../models/view-models/provider.view-model';

interface ServiceAreaProps {
  provider: ProviderViewModel;
}

export default function ServiceAreas({
  provider: { serviceAreas }
}: ServiceAreaProps) {
  if (!serviceAreas?.length) return <></>;

  return (
    <div className='space-y-2'>
      <h3 className='text-lg font-bold'>Cidades que atende:</h3>

      <div className='flex gap-2 flex-wrap'>
        {serviceAreas?.map((sa) => (
          <Chip key={'serviceArea-' + sa.id}>
            {sa.address?.city} - {sa.address?.state}
          </Chip>
        ))}
      </div>
    </div>
  );
}
