import { ProviderLinkTypeViewModel } from './provider-link-type.view-model';

export interface ProviderLinkViewModel {
  id: number;
  label: string;
  url: string;
  urlKey: string | null;
  index: number;
  type?: ProviderLinkTypeViewModel;
  isActive: boolean;
}
