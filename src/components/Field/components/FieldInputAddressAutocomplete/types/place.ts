export interface Place {
  formattedAddress: string;
  street?: string;
  number?: string;
  zipCode?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude: number;
  longitude: number;
}
