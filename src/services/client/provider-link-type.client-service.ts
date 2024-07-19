import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { ProviderLinkTypeViewModel } from '../../models/view-models/provider-link-type.view-model';

export const useProviderLinkTypeClientService = () => {
  const getAll = (): Promise<ProviderLinkTypeViewModel[]> =>
    http()
      .get(API_URLS.providers.linkTypes.getAll())
      .then((response) => response.data);

  return {
    getAll
  };
};
