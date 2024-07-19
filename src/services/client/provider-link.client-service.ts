import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { ProviderLinkCreateInputModel } from '../../models/input-models/provider-link-create.input';
import { ProviderLinkReorderInputModel } from '../../models/input-models/provider-link-reorder.input';
import { ProviderLinkUpdateInputModel } from '../../models/input-models/provider-link-update.input';
import { ProviderLinkViewModel } from '../../models/view-models/provider-link.view-model';

export const useProviderLinkClientService = () => {
  const getAllByProvider = (): Promise<ProviderLinkViewModel[]> =>
    http()
      .get(API_URLS.providers.links.getAllByProvider())
      .then((response) => response.data);

  const create = (
    data: ProviderLinkCreateInputModel
  ): Promise<ProviderLinkViewModel> =>
    http()
      .post(API_URLS.providers.links.create(), data)
      .then((response) => response.data);

  const update = (
    id: number,
    data: Partial<ProviderLinkUpdateInputModel>
  ): Promise<ProviderLinkViewModel> =>
    http()
      .put(API_URLS.providers.links.update(id), data)
      .then((response) => response.data);

  const reorder = (
    data: ProviderLinkReorderInputModel
  ): Promise<ProviderLinkViewModel> =>
    http()
      .patch(API_URLS.providers.links.reorder(), data)
      .then((response) => response.data);

  const remove = (id: number): Promise<void> =>
    http()
      .delete(API_URLS.providers.links.delete(id))
      .then((response) => response.data);

  return {
    getAllByProvider,
    create,
    update,
    reorder,
    remove
  };
};
