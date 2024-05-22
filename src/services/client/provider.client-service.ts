import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { ProviderInputModel } from '../../models/input-models/provider.input-model';
import { ProviderViewModel } from '../../models/view-models/provider.view-model';

export const createProviderClientService = () => {
  const create = (
    provider: ProviderInputModel,
    profileImageFile?: File
  ): Promise<ProviderViewModel> => {
    const body = new FormData();

    body.append('data', JSON.stringify(provider));

    if (profileImageFile) body.append('profileImage', profileImageFile);

    return http()
      .post(API_URLS.providers.create(), body)
      .then((response) => response.data);
  };

  const update = (
    provider: Partial<ProviderInputModel>,
    profileImageFile?: File
  ): Promise<ProviderViewModel> => {
    const body = new FormData();

    body.append('data', JSON.stringify(provider));

    if (profileImageFile) body.append('profileImage', profileImageFile);

    return http()
      .put(API_URLS.providers.update(), body)
      .then((response) => response.data);
  };

  const slugAlreadyExists = (slug: string): Promise<boolean> =>
    http()
      .get(API_URLS.providers.slugAlreadyExists(slug))
      .then((response) => response.data);

  return {
    create,
    update,
    slugAlreadyExists
  };
};
