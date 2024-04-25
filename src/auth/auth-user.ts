import { ProviderViewModel } from '../models/view-models/provider.view-model';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  provider?: ProviderViewModel;
}
