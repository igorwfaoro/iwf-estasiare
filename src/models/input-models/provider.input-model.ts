import { AddressInputModel } from './address.input-model';

export interface ProviderInputModel {
  slug: string;
  name: string;
  bio?: string | null;
  address?: AddressInputModel;
  primaryColor?: string | null;
  categories?: number[];
}
