import { AddressViewModel } from './address.view-model';
import { ProviderCategoryViewModel } from './provider-category.view-model';

export interface ProviderViewModel {
  id: number;
  slug: string;
  name: string;
  contactEmail: string | null;
  contactPhone: string | null;
  contactWhatsApp: string | null;
  profileImage: string | null;
  bio: string | null;
  link: string | null;
  address?: AddressViewModel | null;
  primaryColor?: string | null;
  createdAt: string;

  categories?: ProviderCategoryViewModel[];
}
