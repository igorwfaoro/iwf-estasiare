import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';
import { AddressCityViewModel } from '../../models/view-models/address-city.view-model';

export const createAddressClientService = () => {
  const getAllCities = (): Promise<AddressCityViewModel[]> =>
    http()
      .get(API_URLS.address.getAllCities())
      .then((response) => response.data);

  return {
    getAllCities
  };
};
