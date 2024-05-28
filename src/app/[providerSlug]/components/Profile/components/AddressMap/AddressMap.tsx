import MainAddressMap from '../../../../../../components/AddressMap/AddressMap';
import { ProviderViewModel } from '../../../../../../models/view-models/provider.view-model';

interface AddressMapProps {
  provider: ProviderViewModel;
}

export default function AddressMap({ provider }: AddressMapProps) {
  if (!provider.address) return <></>;
  return <MainAddressMap address={provider.address} className='h-[250px]' />;
}
