import { ProviderViewModel } from '../../../../models/view-models/provider.view-model';
import AddressMap from './components/AddressMap/AddressMap';
import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import Links from './components/Links/Links';
import ServiceAreas from './components/ServiceAreas/ServiceAreas';

interface ProfileProps {
  provider: ProviderViewModel;
}

export default function Profile({ provider }: ProfileProps) {
  return (
    <section className="space-y-4">
      <Header provider={provider} />
      <Categories provider={provider} />
      <Links provider={provider} />
      <AddressMap provider={provider} />
      <ServiceAreas provider={provider} />
    </section>
  );
}
