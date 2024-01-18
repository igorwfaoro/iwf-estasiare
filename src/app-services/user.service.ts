import { prisma } from '../data/db';
import { UserViewModel } from '../models/view-models/user.view-model';
import { userConverter } from '../converters/user.converter';
import { Profile } from 'next-auth';

export const createUserService = () => {
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

  const getByEmail = async (email: string): Promise<UserViewModel> => {
    const user = await prisma.user.findFirstOrThrow({
      where: { email }
    });

    return userConverter.modelToViewModel(user);
  };

  return {
    verify,
    getByEmail
  };
};
