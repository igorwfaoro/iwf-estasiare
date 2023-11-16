import { giftConverter } from '../converters/gift.converter';
import { prisma } from '../data/db';
import { GiftViewModel } from '../models/view-models/gift.view-model';

export const createGiftService = () => {
  const getAll = async (): Promise<GiftViewModel[]> => {
    const gifts = await prisma.gift.findMany();
    return gifts.map(giftConverter.modelToViewModel);
  };

  return {
    getAll,
  };
};
