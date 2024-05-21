import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { ProviderCategoryViewModel } from '../../models/view-models/provider-category.view-model';

export const createProviderClientService = () => {
  const getAll = (): Promise<ProviderCategoryViewModel[]> =>
    http()
      .get(API_URLS.providers.categories.getAll())
      .then((response) => response.data);

  return {
    getAll
  };
};
