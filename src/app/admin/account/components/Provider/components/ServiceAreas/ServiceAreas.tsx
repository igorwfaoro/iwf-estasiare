import { useRef } from 'react';
import { MdDelete } from 'react-icons/md';
import Card from '../../../../../../../components/Card/Card';
import Field from '../../../../../../../components/Field/Field';
import { Place } from '../../../../../../../components/Field/components/FieldInputAddressAutocomplete/types/place';
import { useProviderContext } from '../../contexts/ProviderAccountProvider';

interface ServiceAreasProps {}

export default function ServiceAreas({}: ServiceAreasProps) {
  const {
    user,
    userIsLoaded,
    userIsProvider,
    serviceAreas,
    setServiceAreas,
    serviceAreasIsLoading
  } = useProviderContext();

  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveServiceArea = (index: number) => {
    setServiceAreas((curr) => {
      const newAreas = [...curr];
      newAreas.splice(index, 1);
      return newAreas;
    });
  };

  // TODO: validate duplicate areas
  const handleNewServiceArea = (place: Place) => {
    const canAddPlace =
      !!place.city &&
      !serviceAreas.find(
        (sa) =>
          sa.address.city === place.city && sa.address.state === place.state
      );

    if (!canAddPlace) return;

    setServiceAreas((curr) => [...curr, { address: place }]);
  };

  return (
    <div className="space-y-4">
      <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {serviceAreas.map((sa, i) => (
          <Card
            key={'serviceArea-' + i}
            className="flex items-center justify-between gap-2 p-4 rounded-lg"
          >
            <div>
              {sa.address.city} - {sa.address.state}
            </div>
            <MdDelete
              className="cursor-pointer"
              size={24}
              onClick={() => handleRemoveServiceArea(i)}
            />
          </Card>
        ))}
      </div>

      <Field>
        <Field.AddressAutocomplete
          placeholder="Digite uma cidade..."
          placesType="administrative_area_level_2"
          clearAfterSelect
          focusAfterSelect
          onAddressSelected={(value) => handleNewServiceArea(value)}
        />
      </Field>
    </div>
  );
}
