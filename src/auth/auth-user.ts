import { UserRole } from '@prisma/client';
import { ProviderViewModel } from '../models/view-models/provider.view-model';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  provider?: ProviderViewModel;
}
