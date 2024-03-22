import {
  ReactGoogleAutocompleteProps,
  usePlacesWidget
} from 'react-google-autocomplete';

export default function useAddressAutocomplete<RefType>(
  props?: ReactGoogleAutocompleteProps
) {
  const { ref } = usePlacesWidget<RefType>({
    ...props,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places'],
    options: {
      types: 'establishment|address'
    }
  });

  return { ref };
}
