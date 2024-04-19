import { usePlacesWidget } from 'react-google-autocomplete';

import FieldInput, { FieldInputProps } from '../FieldInput/FieldInput';

interface FieldInputAddressAutocompleteProps extends FieldInputProps {
  onAddressSelected: (address: string) => void;
  defaultValue?: string;
}

export default function FieldInputAddressAutocomplete({
  onAddressSelected,
  placeholder = 'Digite um endereço',
  defaultValue,
  ...props
}: FieldInputAddressAutocompleteProps) {
  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places'],
    options: {
      types: 'establishment|address'
    },
    onPlaceSelected: (place) => onAddressSelected(place.formatted_address)
  });

  return (
    <FieldInput
      {...props}
      ref={ref}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
