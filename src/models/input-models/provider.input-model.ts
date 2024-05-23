import { AddressInputModel } from './address.input-model';

export interface ProviderInputModel {
  slug: string;
  name: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactWhatsApp?: string | null;
  bio?: string | null;
  link?: string | null;
  address?: AddressInputModel;
  primaryColor?: string | null;
  categories?: number[];
}
