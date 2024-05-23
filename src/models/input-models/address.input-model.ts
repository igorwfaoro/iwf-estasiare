export interface AddressInputModel {
  formattedAddress: string;
  street?: string | null;
  number?: string | null;
  zipCode?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  latitude: number;
  longitude: number;
}
