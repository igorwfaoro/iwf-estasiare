import { API_URLS } from '../../constants/api-urls';
import { headerUserPublicIpv4 } from '../../constants/headers';
import { http } from '../../http/http';
import { ProviderSearchInputModel } from '../../models/input-models/provider-search.input-model';
import { ProviderInputModel } from '../../models/input-models/provider.input-model';
import { ProviderViewModel } from '../../models/view-models/provider.view-model';
import { SearchDataViewModel } from '../../models/view-models/search-data.view-model';
import { getPublicIp } from '../../util/helpers/http.helper';

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

  const search = async (
    params: ProviderSearchInputModel = {}
  ): Promise<SearchDataViewModel<ProviderViewModel>> =>
    http()
      .get(API_URLS.providers.search(), {
        params,
        headers: {
          [headerUserPublicIpv4]: await getPublicIp()
        }
      })
      .then((response) => response.data);

  return {
    create,
    update,
    slugAlreadyExists,
    search
  };
};
