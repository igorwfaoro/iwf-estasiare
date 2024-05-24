import { AddressViewModel } from './address.view-model';
import { ProviderCategoryViewModel } from './provider-category.view-model';
import { ProviderLinkViewModel } from './provider-link.view-model';

export interface ProviderViewModel {
  id: number;
  slug: string;
  name: string;
  profileImage: string | null;
  bio: string | null;
  address?: AddressViewModel | null;
  primaryColor?: string | null;
  createdAt: string;

  categories?: ProviderCategoryViewModel[];
  links?: ProviderLinkViewModel[];
}
