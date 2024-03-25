import { usePlacesWidget } from 'react-google-autocomplete';
import FieldInput, { FieldInputProps } from '../FieldInput/FieldInput';

interface FieldInputAddressAutocompleteProps extends FieldInputProps {
  onAddressSelected: (address: string) => void;
  initialValue?: string;
}

export default function FieldInputAddressAutocomplete({
  onAddressSelected,
  initialValue,
  ...props
}: FieldInputAddressAutocompleteProps) {
  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places'],
    inputAutocompleteValue: initialValue,
    options: {
      types: 'establishment|address'
    },
    onPlaceSelected: (place) => onAddressSelected(place.formatted_address)
  });

  return <FieldInput {...props} ref={ref} />;
}
