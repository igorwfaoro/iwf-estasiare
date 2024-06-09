import { publicIpv4 } from 'public-ip';

export const formatToShow = (url: string) => {
  let newUrl = url;

  if (newUrl.search('://') >= 0) {
    newUrl = newUrl.split('://')[1];
  }

  if (newUrl[newUrl.length - 1] === '/') newUrl = newUrl.slice(0, -1);

  return newUrl;
};

export const mapErrorResponse = (error: any) => {
  return error?.response?.data?.message || 'Algo errado...';
};

type ParamTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  arrayOfStrings: string[];
  arrayOfNumbers: number[];
};

export const getSearchParamValue = <T extends keyof ParamTypeMap>(
  param: string,
  type: T,
  urlSearchParams: URLSearchParams
): ParamTypeMap[T] | undefined => {
  const value =
    type === 'arrayOfStrings' || type === 'arrayOfNumbers'
      ? urlSearchParams.getAll(param)
      : urlSearchParams.get(param);

  if (value === null || !value.length) return undefined;

  const typeRules: {
    [key in keyof ParamTypeMap]: () => ParamTypeMap[key];
  } = {
    string: () => String(value),
    number: () => Number(value),
    boolean: () => value === 'true' || value === '1',
    arrayOfStrings: () => (value as string[]).map(String),
    arrayOfNumbers: () => (value as string[]).map(Number)
  };

  return typeRules[type]();
};

const userPublicIpStorageKey = 'userPublicIp';

export const getPublicIp = async () => {
  let publicIp = window.localStorage.getItem(userPublicIpStorageKey);

  if (!publicIp) {
    try {
      publicIp = await publicIpv4();
      window.localStorage.setItem(userPublicIpStorageKey, publicIp);
    } catch {}
  }

  return publicIp || undefined;
};

export const isValidUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch (e) {
    return false;
  }
};
