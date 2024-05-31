import { prisma } from '../../data/db';
import { AddressCityViewModel } from '../../models/view-models/address-city.view-model';

export const createAddressServerService = () => {
  const getAllCities = async (): Promise<AddressCityViewModel[]> => {
    const cities = await prisma.address.findMany({
      where: { city: { not: null } },
      select: { city: true, state: true },
      distinct: ['city'],
      orderBy: [{ state: 'asc' }, { city: 'asc' }]
    });

    return cities as AddressCityViewModel[];
  };

  return {
    getAllCities
  };
};
