import { Profile } from 'next-auth';

import { Prisma } from '@prisma/client';
import { getAuthSession, getAuthUser } from '../../auth/auth-config';
import { AuthUser } from '../../auth/auth-user';
import { userConverter } from '../../converters/user.converter';
import { prisma } from '../../data/db';
import { AuthError } from '../../errors/types/auth.error';
import { NotFoundError } from '../../errors/types/not-found.error';
import { UserUpdateInputModel } from '../../models/input-models/user-update.input-model';

const defaultInclude: Prisma.UserInclude = {
  provider: {
    include: {
      providerCategories: { include: { category: true } },
      address: true,
      serviceAreas: {
        include: {
          address: true
        }
      }
    }
  }
};

export const createUserServerService = () => {
  const verifyByProfile = async (profile: Profile): Promise<boolean> => {
    if (!profile.email) return false;

    const user = await prisma.user.findFirst({
      where: { email: profile.email }
    });

    if (user) return true;

    await prisma.user.create({
      data: {
        email: profile.email,
        name: profile.name || profile.email.split('@')[0]
      }
    });

    return true;
  };

  const verifyByEmailAndPassword = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Promise<AuthUser> => {
    const user = await prisma.user.findFirst({
      where: { email },
      include: defaultInclude
    });

    if (!user) throw new AuthError('E-mail ou Senha inválida');

    if (!user.password) throw new AuthError('Usuário cadastrado com Google');

    // if (!(await compare(password, user.password)))
    //   throw new AuthError('E-mail ou Senha inválida');

    return userConverter.modelToAuthUser(user);
  };

  const getByEmail = async (email: string): Promise<AuthUser> => {
    const user = await prisma.user.findFirst({
      where: { email },
      include: defaultInclude
    });

    if (!user) throw new NotFoundError('Usuário não encontrado');

    return userConverter.modelToAuthUser(user);
  };

  const update = async (input: UserUpdateInputModel): Promise<AuthUser> => {
    const user = await getAuthUser();

    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: input,
      include: defaultInclude
    });

    const session = await getAuthSession();

    const viewModel = userConverter.modelToAuthUser(newUser);
    session.user = viewModel;

    return viewModel;
  };

  return {
    verifyByProfile,
    verifyByEmailAndPassword,
    getByEmail,
    update
  };
};
