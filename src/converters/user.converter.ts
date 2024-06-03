import { Provider, User } from '@prisma/client';

import { AuthUser } from '../auth/auth-user';
import { providerConverter } from './provider.converter';

export type UserConverterModel = User & { provider?: Provider | null };

export const userConverter = {
  modelToAuthUser: (model: UserConverterModel): AuthUser => ({
    id: Number(model.id),
    name: model.name,
    email: model.email,
    role: model.role,
    provider: model.provider
      ? providerConverter.modelToViewModel(model.provider)
      : undefined
  })
};
