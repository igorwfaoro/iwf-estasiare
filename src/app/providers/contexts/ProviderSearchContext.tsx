'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLoader } from '../../../contexts/LoaderContext';
import { useToast } from '../../../contexts/ToastContext';
import { ProviderCategoryViewModel } from '../../../models/view-models/provider-category.view-model';
import { createAddressClientService } from '../../../services/client/gift.client-service';
import { createProviderCategoryClientService } from '../../../services/client/provider-category.client-service';
import { createProviderClientService } from '../../../services/client/provider.client-service';

export interface ProviderSearchIProvider {
  categories: CategorySelect[];
  cities: string[];
}

interface ProviderSearchProviderProps {
  children: any;
  isRegister?: boolean;
}

export type CategorySelect = ProviderCategoryViewModel & { selected?: boolean };

const ProviderSearchContext = createContext<
  ProviderSearchIProvider | undefined
>(undefined);

const ProviderSearchProvider = ({
  children,
  isRegister
}: ProviderSearchProviderProps) => {
  const loader = useLoader();
  const toast = useToast();

  const providerService = createProviderClientService();
  const providerCategoryService = createProviderCategoryClientService();
  const addressService = createAddressClientService();

  const [categories, setCategories] = useState<CategorySelect[]>([]);

  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    getCategories();
    getCities();
  }, []);

  const getCategories = () => {
    providerCategoryService.getAll().then(setCategories);
  };

  const getCities = () => {
    addressService.getAllCities().then(setCities);
  };

  const returnValue = useMemo(
    () => ({ categories, cities }),
    [categories, cities]
  );

  return (
    <ProviderSearchContext.Provider value={returnValue}>
      {children}
    </ProviderSearchContext.Provider>
  );
};

export default ProviderSearchProvider;

export const useProviderSearchContext = () => useContext(ProviderSearchContext)!;
