import { API_URLS } from '../../constants/api-urls';
import { http } from '../../http/http';

export const createAddressClientService = () => {
  const getAllCities = (): Promise<string[]> =>
    http()
      .get(API_URLS.address.getAllCities())
      .then((response) => response.data);

  return {
    getAllCities
  };
};
