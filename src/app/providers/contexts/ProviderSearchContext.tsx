'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useToast } from '../../../contexts/ToastContext';
import { ProviderSearchInputModel } from '../../../models/input-models/provider-search.input-model';
import { AddressCityViewModel } from '../../../models/view-models/address-city.view-model';
import { ProviderCategoryViewModel } from '../../../models/view-models/provider-category.view-model';
import { ProviderViewModel } from '../../../models/view-models/provider.view-model';
import { SearchDataViewModel } from '../../../models/view-models/search-data.view-model';
import { createAddressClientService } from '../../../services/client/address.client-service';
import { createProviderCategoryClientService } from '../../../services/client/provider-category.client-service';
import { createProviderClientService } from '../../../services/client/provider.client-service';

export interface ProviderSearchIProvider {
  categories: ProviderCategoryViewModel[];
  cities: AddressCityViewModel[];
  providersResult: SearchDataViewModel<ProviderViewModel>;
  searchParams: ProviderSearchInputModel;
  setSearchParams: Dispatch<SetStateAction<ProviderSearchInputModel>>;
  providersIsLoading: boolean;
  providersIsLoaded: boolean;
}

interface ProviderSearchProviderProps {
  children: any;
}

const ProviderSearchContext = createContext<
  ProviderSearchIProvider | undefined
>(undefined);

const ProviderSearchProvider = ({ children }: ProviderSearchProviderProps) => {
  const toast = useToast();

  const providerService = createProviderClientService();
  const providerCategoryService = createProviderCategoryClientService();
  const addressService = createAddressClientService();

  const [searchParams, setSearchParams] = useState<ProviderSearchInputModel>(
    {}
  );

  const [categories, setCategories] = useState<ProviderCategoryViewModel[]>([]);
  const [cities, setCities] = useState<AddressCityViewModel[]>([]);

  const [providersResult, setProvidersResult] = useState<
    SearchDataViewModel<ProviderViewModel>
  >({ data: [] });

  const [providersIsLoaded, setProvidersIsLoaded] = useState(false);
  const [providersIsLoading, setProviderIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
    getCities();
    searchProviders();
  }, []);

  useEffect(() => {
    searchProviders();
  }, [searchParams]);

  const getCategories = () => {
    providerCategoryService.getAll().then(setCategories);
  };

  const getCities = () => {
    addressService.getAllCities().then(setCities);
  };

  const searchProviders = () => {
    if (!providersIsLoading) setProviderIsLoading(true);

    providerService
      .search(searchParams)
      .then(setProvidersResult)
      .catch(() => toast.open('Erro ao buscar fornecedores', 'error'))
      .finally(() => {
        setProviderIsLoading(false);
        if (!providersIsLoaded) setProvidersIsLoaded(true);
      });
  };

  const returnValue = useMemo(
    () => ({
      categories,
      cities,
      providersResult,
      searchParams,
      setSearchParams,
      providersIsLoaded,
      providersIsLoading
    }),
    [
      categories,
      cities,
      providersResult,
      searchParams,
      providersIsLoaded,
      providersIsLoading
    ]
  );

  return (
    <ProviderSearchContext.Provider value={returnValue}>
      {children}
    </ProviderSearchContext.Provider>
  );
};

export default ProviderSearchProvider;

export const useProviderSearchContext = () =>
  useContext(ProviderSearchContext)!;
