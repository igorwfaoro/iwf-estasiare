import { AddressInputModel } from './address.input-model';
import { ProviderServiceAreaInputModel } from './provider-service-area.input-model';

export interface ProviderInputModel {
  slug: string;
  name: string;
  bio?: string | null;
  address?: AddressInputModel;
  primaryColor?: string | null;
  categories?: number[];
  serviceAreas?: ProviderServiceAreaInputModel[];
}
