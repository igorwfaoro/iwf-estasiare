import { User } from '@prisma/client';
import { UserViewModel } from '../models/view-models/user.view-model';

export type UserConverterModel = User & {};

export const userConverter = {
  modelToViewModel: (model: UserConverterModel): UserViewModel => ({
    id: Number(model.id),
    name: model.name,
    email: model.email
  })
};
