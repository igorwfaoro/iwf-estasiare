import { Profile } from 'next-auth';

import { getAuthSession, getAuthUser } from '../../auth/auth-config';
import { AuthUser } from '../../auth/auth-user';
import { userConverter } from '../../converters/user.converter';
import { prisma } from '../../data/db';
import { UserUpdateInputModel } from '../../models/input-models/user-update.input-model';

const defaultInclude = {
  provider: {
    include: { providerCategories: { include: { category: true } } }
  }
};

export const createUserServerService = () => {
  const verify = async (profile: Profile): Promise<boolean> => {
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

  const getByEmail = async (email: string): Promise<AuthUser> => {
    const user = await prisma.user.findFirstOrThrow({
      where: { email },
      include: defaultInclude
    });

    return userConverter.modelToAuthUser(user);
  };

  const update = async (input: UserUpdateInputModel) => {
    const user = await getAuthUser();

    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: input,
      include: defaultInclude
    });

    const session = await getAuthSession();

    session.user = userConverter.modelToAuthUser(newUser);

    return newUser;
  };

  return {
    verify,
    getByEmail,
    update
  };
};
