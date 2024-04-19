import { User } from '@prisma/client';

import { AuthUser } from '../auth/auth-user';

export type UserConverterModel = User & {};

export const userConverter = {
  modelToAuthUser: (model: UserConverterModel): AuthUser => ({
    id: Number(model.id),
    name: model.name,
    email: model.email
  })
};
