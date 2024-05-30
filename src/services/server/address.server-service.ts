import { prisma } from '../../data/db';

export const createAddressServerService = () => {
  const getAllCities = async (): Promise<string[]> => {
    const cities = await prisma.address.findMany({
      where: { city: { not: null } },
      select: { city: true, state: true },
      distinct: ['city']
    });

    return cities.map((c) => `${c.city} - ${c.state}`);
  };

  return {
    getAllCities
  };
};
