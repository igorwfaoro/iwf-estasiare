import { signIn, useSession } from 'next-auth/react';
import { AuthUser } from '../../auth/auth-user';
import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { UserRegisterInputModel } from '../../models/input-models/user-register.input-model';
import { UserUpdateInputModel } from '../../models/input-models/user-update.input-model';

export const useUserClientService = () => {
  const { update: updateSession } = useSession();

  const update = (user: Partial<UserUpdateInputModel>): Promise<AuthUser> => {
    return http()
      .put<AuthUser>(API_URLS.users.update(), user)
      .then(async (response) => {
        await updateSession({ user: response.data });
        return response.data;
      });
  };

  const register = async (user: UserRegisterInputModel): Promise<void> => {
    await http().post(API_URLS.users.register(), user);

    const result = await signIn('credentials', { ...user, redirect: false });

    if (!result?.ok) throw result;
  };

  return {
    update,
    register
  };
};
