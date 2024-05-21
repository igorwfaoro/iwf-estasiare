import { useSession } from 'next-auth/react';
import { AuthUser } from '../../auth/auth-user';
import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { UserUpdateInputModel } from '../../models/input-models/user-update.input-model';

export const createUserClientService = () => {
  const { update: updateSession, data: sessionData } = useSession();

  const update = (user: Partial<UserUpdateInputModel>): Promise<AuthUser> => {
    return http()
      .put<AuthUser>(API_URLS.users.update(), user)
      .then(async (response) => {
        await updateSession({ user: response.data });
        return response.data;
      });
  };

  return {
    update
  };
};
