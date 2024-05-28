import { usePlacesWidget } from 'react-google-autocomplete';

import { useState } from 'react';
import FieldInput, { FieldInputProps } from '../FieldInput/FieldInput';
import { Place } from './types/place';

interface FieldInputAddressAutocompleteProps extends FieldInputProps {
  onAddressSelected: (place: Place) => void;
  defaultPlaceValue?: Place;
  placesType?: string;
  clearAfterSelect?: boolean;
  focusAfterSelect?: boolean;
}

export default function FieldInputAddressAutocomplete({
  onAddressSelected,
  placeholder = 'Digite um endereço',
  defaultPlaceValue,
  placesType = 'establishment|address',
  clearAfterSelect,
  focusAfterSelect,
  ...props
}: FieldInputAddressAutocompleteProps) {
  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places'],
    language: 'pt-br',
    options: {
      types: 'establishment|address'
    },
    onPlaceSelected: (place) => {
      !clearAfterSelect && setCurrentPlace(place);
      onAddressSelected(mapPlaceResult(place));

      if (clearAfterSelect) ref.current!.value = '';
      if (focusAfterSelect) ref.current!.focus();
    }
  });

  const [currentPlace, setCurrentPlace] = useState<Place | undefined>(
    defaultPlaceValue
  );

  const mapPlaceResult = (place: any): Place => {
    return {
      formattedAddress: place.formatted_address,
      street: place.address_components.find((x: any) =>
        x.types.includes('route')
      )?.long_name,
      number: place.address_components.find((x: any) =>
        x.types.includes('street_number')
      )?.long_name,
      zipCode: place.address_components.find((x: any) =>
        x.types.includes('postal_code')
      )?.long_name,
      neighborhood: place.address_components.find((x: any) =>
        x.types.includes('sublocality_level_1')
      )?.long_name,
      city: place.address_components.find((x: any) =>
        x.types.includes('administrative_area_level_2')
      )?.long_name,
      state: place.address_components.find((x: any) =>
        x.types.includes('administrative_area_level_1')
      )?.short_name,
      country: place.address_components.find((x: any) =>
        x.types.includes('country')
      )?.long_name,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    };
  };

  return (
    <FieldInput
      {...props}
      autoComplete="off"
      ref={ref}
      defaultValue={currentPlace?.formattedAddress}
      placeholder={placeholder}
    />
  );
}
