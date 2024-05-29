import ipLocation from 'iplocation';

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  region: {
    name: string;
    code: string;
  };
  country: {
    name: string;
    code: string;
    iso3: string;
    capital: string;
    tld: string;
    population: number;
    area: number;
    callingCode: string;
    postalCode: string;
    timezone: {
      code: string;
      offset: string;
    };
    currency: {
      name: string;
      code: string;
    };
    languages: string[];
  };
  continent: {
    code: string;
    inEu: boolean;
  };
}

const isValidIp = (ip: string): boolean => {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
};

export const getLocationByIp = async (
  ip: string
): Promise<LocationData | undefined> => {
  if (!isValidIp(ip)) return undefined;

  try {
    const location = await ipLocation(ip);
    return location as LocationData;
  } catch (error) {
    console.error('Error fetching location for IP:', ip, error);
    return undefined;
  }
};
